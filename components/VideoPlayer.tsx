
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { 
  PlayIcon, PauseIcon, Volume2Icon, VolumeXIcon, 
  MaximizeIcon, MinimizeIcon, SubtitlesIcon 
} from './icons';

declare const Hls: any;

interface VideoPlayerProps {
  src: string;
  subtitles?: string;
  onProgressUpdate?: (currentTime: number, duration: number) => void;
  initialTime?: number;
}

const formatTime = (timeInSeconds: number) => {
  const date = new Date(0);
  date.setSeconds(timeInSeconds);
  const timeString = date.toISOString().substr(11, 8);
  return timeString.startsWith('00:') ? timeString.substr(3) : timeString;
};

const VideoPlayer: React.FC<VideoPlayerProps> = ({ src, subtitles, onProgressUpdate, initialTime = 0 }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const hlsInstanceRef = useRef<any>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [areControlsVisible, setAreControlsVisible] = useState(true);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [showSubtitles, setShowSubtitles] = useState(true);
  
  let controlsTimeout = useRef<number | null>(null);

  const togglePlay = useCallback(() => {
    if (videoRef.current?.paused) {
      videoRef.current?.play();
    } else {
      videoRef.current?.pause();
    }
  }, []);

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if(videoRef.current) videoRef.current.volume = newVolume;
    setIsMuted(newVolume === 0);
  };
  
  const toggleMute = () => {
    setIsMuted(!isMuted);
    if(videoRef.current) videoRef.current.muted = !isMuted;
  };
  
  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value);
    if(videoRef.current) videoRef.current.currentTime = newTime;
    setProgress(newTime);
  };

  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
        containerRef.current?.requestFullscreen();
    } else {
        document.exitFullscreen();
    }
  };

  const handleMouseMove = () => {
    setAreControlsVisible(true);
    if (controlsTimeout.current) clearTimeout(controlsTimeout.current);
    controlsTimeout.current = window.setTimeout(() => {
      if(isPlaying) setAreControlsVisible(false);
    }, 3000);
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Clean up previous HLS instance
    if (hlsInstanceRef.current) {
        hlsInstanceRef.current.destroy();
    }

    if (src.endsWith('.m3u8')) {
        if (typeof Hls !== 'undefined' && Hls.isSupported()) {
            const hls = new Hls();
            hlsInstanceRef.current = hls;
            hls.loadSource(src);
            hls.attachMedia(video);
        } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
            // Native support
            video.src = src;
        }
    } else {
        video.src = src;
    }

    return () => {
        if (hlsInstanceRef.current) {
            hlsInstanceRef.current.destroy();
            hlsInstanceRef.current = null;
        }
    };
  }, [src]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleTimeUpdate = () => {
        setProgress(video.currentTime);
        if (onProgressUpdate && !isNaN(video.duration)) {
            onProgressUpdate(video.currentTime, video.duration);
        }
    };
    const handleLoadedMetadata = () => {
        if(!isNaN(video.duration)) setDuration(video.duration);
        if(initialTime > 0 && initialTime < video.duration) {
            video.currentTime = initialTime;
        }
        video.play().catch(error => console.error("Autoplay failed:", error));
    };
    const handleFullscreenChange = () => setIsFullScreen(!!document.fullscreenElement);
    
    video.addEventListener('play', handlePlay);
    video.addEventListener('pause', handlePause);
    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    document.addEventListener('fullscreenchange', handleFullscreenChange);

    return () => {
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('pause', handlePause);
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      if (controlsTimeout.current) clearTimeout(controlsTimeout.current);
    };
  }, [onProgressUpdate, initialTime]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
        if(e.code === "Space") {
            e.preventDefault();
            togglePlay();
        }
        if(e.code === "KeyF") {
            e.preventDefault();
            toggleFullScreen();
        }
        if(e.code === "ArrowRight" && videoRef.current) {
            videoRef.current.currentTime += 10;
        }
        if(e.code === "ArrowLeft" && videoRef.current) {
            videoRef.current.currentTime -= 10;
        }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [togglePlay]);
  
  useEffect(() => {
    if (videoRef.current?.textTracks) {
        for (let i = 0; i < videoRef.current.textTracks.length; i++) {
            videoRef.current.textTracks[i].mode = showSubtitles ? 'showing' : 'hidden';
        }
    }
  }, [showSubtitles]);


  return (
    <div ref={containerRef} onMouseMove={handleMouseMove} onMouseLeave={() => isPlaying && setAreControlsVisible(false)} className="relative w-full aspect-video bg-black group">
      <video ref={videoRef} className="w-full h-full" onClick={togglePlay} playsInline>
        {subtitles && <track kind="subtitles" src={subtitles} srcLang="en" label="Inglés" default />}
      </video>
      <div className={`absolute inset-0 bg-black/30 transition-opacity duration-300 ${areControlsVisible ? 'opacity-100' : 'opacity-0'}`}>
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
          {/* Progress Bar */}
          <input type="range" min="0" max={duration || 0} value={progress} onChange={handleProgressChange} className="w-full h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer range-sm accent-primary"/>
          <div className="flex justify-between items-center text-white mt-2">
            <div className="flex items-center space-x-4">
              <button onClick={togglePlay}>
                {isPlaying ? <PauseIcon className="h-6 w-6"/> : <PlayIcon className="h-6 w-6"/>}
              </button>
              <div className="flex items-center space-x-2">
                <button onClick={toggleMute}>
                  {isMuted || volume === 0 ? <VolumeXIcon className="h-6 w-6"/> : <Volume2Icon className="h-6 w-6"/>}
                </button>
                <input type="range" min="0" max="1" step="0.01" value={isMuted ? 0 : volume} onChange={handleVolumeChange} className="w-24 h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer range-sm accent-primary"/>
              </div>
              <span className="text-sm font-mono">{formatTime(progress)} / {formatTime(duration)}</span>
            </div>
            <div className="flex items-center space-x-4">
                {subtitles && <button onClick={() => setShowSubtitles(!showSubtitles)} className={`${showSubtitles ? 'text-primary' : ''}`}>
                    <SubtitlesIcon className="h-6 w-6"/>
                </button>}
                <button onClick={toggleFullScreen}>
                    {isFullScreen ? <MinimizeIcon className="h-6 w-6"/> : <MaximizeIcon className="h-6 w-6"/>}
                </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
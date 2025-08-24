import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCatalog } from '../contexts/CatalogContext';
import { useUserData } from '../contexts/UserDataContext';
import VideoPlayer from '../components/VideoPlayer';
import { ChevronLeftIcon } from '../components/icons';

const PlayerPage: React.FC = () => {
  const { type, id, episodeId } = useParams<{ type: 'movie' | 'series' | 'channel', id: string, episodeId?: string }>();
  const navigate = useNavigate();
  const { catalog } = useCatalog();
  const { updateContinueWatching, getContinueWatchingInfo } = useUserData();

  let src: string | undefined;
  let subtitles: string | undefined;
  let contentId = id || '';
  let isIframe = false;
  let title = 'Player';

  if (type === 'movie') {
    const movie = catalog.movies.find(m => m.id === id);
    if (movie) {
        src = movie.url;
        subtitles = movie.subtitles;
        title = movie.title;
    }
  } else if (type === 'series') {
    const series = catalog.series.find(s => s.id === id);
    const episode = series?.episodes.find(e => e.id === episodeId);
    if (episode) {
        src = episode.url;
        subtitles = episode.subtitles;
        contentId = series?.id || '';
        title = `${series?.title} - ${episode.title}`;
    }
  } else if (type === 'channel') {
    const channel = catalog.channels.find(c => c.id === id);
    if (channel) {
        src = channel.url;
        title = channel.name;
    }
  }

  if (src && !src.endsWith('.m3u8') && !src.endsWith('.mp4')) {
    isIframe = true;
  }

  if (!src) {
    return <div className="h-screen w-screen flex justify-center items-center text-center text-white bg-black">Medio no encontrado.</div>;
  }

  const handleProgressUpdate = (currentTime: number, duration: number) => {
    if (type !== 'channel' && contentId) {
        updateContinueWatching(contentId, { progress: currentTime, duration });
    }
  };

  const initialTime = type !== 'channel' && contentId ? getContinueWatchingInfo(contentId)?.progress : 0;
  
  return (
    <div className="w-screen h-screen bg-black flex flex-col items-center justify-center">
        <button onClick={() => navigate(-1)} className="absolute top-4 left-4 z-50 p-2 bg-black/50 rounded-full text-white hover:bg-black/75 transition-colors">
            <ChevronLeftIcon className="h-6 w-6" />
        </button>
        {isIframe ? (
            <iframe
                src={src}
                className="w-full h-full border-0"
                title={title}
                allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
                allowFullScreen
            />
        ) : (
            <VideoPlayer 
                src={src} 
                subtitles={subtitles} 
                onProgressUpdate={handleProgressUpdate} 
                initialTime={initialTime}
            />
        )}
    </div>
  );
};

export default PlayerPage;


export interface Movie {
  id: string;
  type: 'movie';
  title: string;
  description: string;
  poster: string;
  banner: string;
  genre: string[];
  year: number;
  duration: string;
  url: string;
  subtitles?: string;
}

export interface Episode {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  url: string;
  subtitles?: string;
}

export interface Series {
  id: string;
  type: 'series';
  title: string;
  description: string;
  poster: string;
  banner: string;
  genre: string[];
  year: number;
  episodes: Episode[];
}

export interface Channel {
  id: string;
  type: 'channel';
  name: string;
  logo: string;
  url: string;
}

export type Content = Movie | Series | Channel;

export interface ContinueWatchingInfo {
  progress: number;
  duration: number;
}

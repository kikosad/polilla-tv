
import React from 'react';
import { Link } from 'react-router-dom';
import { Content, ContinueWatchingInfo } from '../types';
import { useUserData } from '../contexts/UserDataContext';

interface ContentCardProps {
  item: Content;
}

const ContentCard: React.FC<ContentCardProps> = ({ item }) => {
  const { getContinueWatchingInfo } = useUserData();
  const progressInfo = item.type !== 'channel' ? getContinueWatchingInfo(item.id) : undefined;
  
  const getPosterUrl = () => {
    if (item.type === 'channel') return item.logo;
    return item.poster;
  };
  
  const getLink = () => {
      if (item.type === 'channel') {
          return `/player/channel/${item.id}`;
      }
      return `/details/${item.type}/${item.id}`;
  };

  return (
    <Link to={getLink()} className="block group relative rounded-lg overflow-hidden shadow-lg bg-dark-card focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-75">
      <div className="aspect-[2/3] transition-transform duration-300 ease-in-out group-hover:scale-105">
        <img
          src={getPosterUrl()}
          alt={item.type === 'channel' ? item.name : item.title}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
      </div>
      <div className="absolute bottom-0 left-0 p-3 w-full">
        <h3 className="text-white text-sm font-bold truncate group-hover:whitespace-normal">
          {item.type === 'channel' ? item.name : item.title}
        </h3>
        {item.type !== 'channel' && <p className="text-gray-400 text-xs">{item.year}</p>}
      </div>
      {progressInfo && progressInfo.progress > 0 && progressInfo.duration > 0 && (
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gray-500">
          <div
            className="h-full bg-primary"
            style={{ width: `${(progressInfo.progress / progressInfo.duration) * 100}%` }}
          />
        </div>
      )}
    </Link>
  );
};

export default ContentCard;

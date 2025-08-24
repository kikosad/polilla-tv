
import React from 'react';
import { Link } from 'react-router-dom';
import { Channel } from '../types';

interface ChannelListItemProps {
  channel: Channel;
}

const ChannelListItem: React.FC<ChannelListItemProps> = ({ channel }) => {
  return (
    <Link
      to={`/player/channel/${channel.id}`}
      className="flex items-center p-3 bg-light-card dark:bg-dark-card rounded-lg shadow-md hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-200 transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-primary"
      aria-label={`Ver ${channel.name}`}
    >
      <img
        src={channel.logo}
        alt={`${channel.name} logo`}
        className="w-12 h-12 object-contain rounded-md mr-4 flex-shrink-0"
        loading="lazy"
      />
      <span className="font-semibold text-light-text dark:text-dark-text truncate">{channel.name}</span>
    </Link>
  );
};

export default ChannelListItem;

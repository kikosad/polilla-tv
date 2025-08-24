
import React, { useRef } from 'react';
import { Content } from '../types';
import ContentCard from './ContentCard';
import { ChevronLeftIcon, ChevronRightIcon } from './icons';

interface ContentCarouselProps {
  title: string;
  items: Content[];
}

const ContentCarousel: React.FC<ContentCarouselProps> = ({ title, items }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === 'left' ? scrollLeft - clientWidth * 0.8 : scrollLeft + clientWidth * 0.8;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  if (!items || items.length === 0) {
      return null;
  }

  return (
    <div className="mb-8 group relative">
      <h2 className="text-2xl font-bold mb-4 text-light-text dark:text-dark-text">{title}</h2>
      <div className="relative">
        <div ref={scrollRef} className="flex overflow-x-auto space-x-4 pb-4 scrollbar-hide">
          {items.map(item => (
            <div key={item.id} className="flex-shrink-0 w-40 md:w-48 lg:w-56">
              <ContentCard item={item} />
            </div>
          ))}
        </div>
        <button
          onClick={() => scroll('left')}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-black/50 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity focus:outline-none focus:ring-2 focus:ring-primary"
          aria-label="Desplazar a la izquierda"
        >
          <ChevronLeftIcon className="h-6 w-6" />
        </button>
        <button
          onClick={() => scroll('right')}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-black/50 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity focus:outline-none focus:ring-2 focus:ring-primary"
          aria-label="Desplazar a la derecha"
        >
          <ChevronRightIcon className="h-6 w-6" />
        </button>
      </div>
    </div>
  );
};

export default ContentCarousel;
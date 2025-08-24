
import React, { useMemo } from 'react';
import { useCatalog } from '../contexts/CatalogContext';
import ContentCarousel from '../components/ContentCarousel';
import { Link } from 'react-router-dom';
import { PlayIcon } from '../components/icons';
import ChannelListItem from '../components/ChannelListItem';
import ContentCard from '../components/ContentCard';

const HomePage: React.FC = () => {
  const { catalog } = useCatalog();

  const featuredContent = useMemo(() => {
    if (catalog.movies.length > 0) return catalog.movies[0];
    if (catalog.series.length > 0) return catalog.series[0];
    return null;
  }, [catalog]);

  return (
    <div className="min-h-screen">
      {featuredContent && (
        <div className="relative h-[60vh] text-white">
          <img src={featuredContent.banner} alt={featuredContent.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-dark-bg via-dark-bg/50 to-transparent"></div>
          <div className="absolute bottom-0 left-0 p-8 md:p-12">
            <h1 className="text-4xl md:text-6xl font-black max-w-2xl">{featuredContent.title}</h1>
            <p className="text-lg mt-4 max-w-2xl line-clamp-3">{featuredContent.description}</p>
            <div className="mt-6 flex space-x-4">
              {featuredContent.type === 'movie' || (featuredContent.type === 'series' && featuredContent.episodes && featuredContent.episodes.length > 0) ? (
                <Link
                  to={`/player/${featuredContent.type}/${featuredContent.id}${featuredContent.type === 'series' ? `/${featuredContent.episodes[0].id}`: ''}`}
                  className="flex items-center bg-primary hover:bg-primary-hover text-white font-bold py-2 px-6 rounded-md transition-transform hover:scale-105"
                >
                  <PlayIcon className="h-6 w-6 mr-2" />
                  Reproducir
                </Link>
              ) : null}
              <Link
                to={`/details/${featuredContent.type}/${featuredContent.id}`}
                className="flex items-center bg-gray-500/70 hover:bg-gray-600/70 text-white font-bold py-2 px-6 rounded-md backdrop-blur-sm transition-transform hover:scale-105"
              >
                Más Info
              </Link>
            </div>
          </div>
        </div>
      )}

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-light-text dark:text-dark-text">Películas Destacadas</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                {catalog.movies.map(movie => (
                    <ContentCard key={movie.id} item={movie} />
                ))}
            </div>
        </div>
        <ContentCarousel title="Series Recomendadas" items={catalog.series} />
        
        <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-light-text dark:text-dark-text">Canales en Vivo</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {catalog.channels.map(channel => (
                    <ChannelListItem key={channel.id} channel={channel} />
                ))}
            </div>
        </div>
      </main>
    </div>
  );
};

export default HomePage;

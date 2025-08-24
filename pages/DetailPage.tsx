
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCatalog } from '../contexts/CatalogContext';
import { useUserData } from '../contexts/UserDataContext';
import { PlayIcon, HeartIcon } from '../components/icons';
import { Series, Movie } from '../types';

const DetailPage: React.FC = () => {
  const { type, id } = useParams<{ type: 'movie' | 'series'; id: string }>();
  const { catalog } = useCatalog();
  const { isFavorite, toggleFavorite } = useUserData();

  const content = type === 'movie'
    ? catalog.movies.find(m => m.id === id)
    : catalog.series.find(s => s.id === id);

  if (!content) {
    return <div className="text-center py-10 text-light-text dark:text-dark-text">Contenido no encontrado.</div>;
  }

  const movie = content as Movie;
  const series = content as Series;

  return (
    <div className="min-h-screen text-light-text dark:text-dark-text">
      <div className="relative h-[50vh] md:h-[60vh]">
        <img src={content.banner} alt={content.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-light-bg dark:from-dark-bg to-transparent"></div>
      </div>

      <div className="container mx-auto px-4 pb-12 -mt-24 relative z-10">
        <div className="md:flex md:space-x-8">
          <div className="md:w-1/3 flex-shrink-0">
            <img src={content.poster} alt={content.title} className="rounded-lg shadow-2xl w-full" />
          </div>
          <div className="md:w-2/3 mt-6 md:mt-0">
            <h1 className="text-4xl font-black">{content.title}</h1>
            <div className="flex items-center space-x-4 mt-2 text-gray-400">
              <span>{content.year}</span>
              <span className="border-l border-gray-500 pl-4">{content.genre.join(', ')}</span>
              {movie.duration && <span className="border-l border-gray-500 pl-4">{movie.duration}</span>}
            </div>
            <p className="mt-4 text-base">{content.description}</p>
            <div className="mt-6 flex items-center space-x-4">
              {content.type === 'movie' || (content.type === 'series' && series.episodes && series.episodes.length > 0) ? (
                <Link
                  to={`/player/${content.type}/${content.id}${content.type === 'series' ? `/${series.episodes[0].id}`: ''}`}
                  className="flex items-center bg-primary hover:bg-primary-hover text-white font-bold py-2.5 px-6 rounded-md transition-transform hover:scale-105"
                >
                  <PlayIcon className="h-6 w-6 mr-2" />
                  Reproducir
                </Link>
              ) : null}
              <button
                onClick={() => toggleFavorite(content.id)}
                className="p-3 bg-gray-700/50 hover:bg-gray-700/80 rounded-full transition-colors"
              >
                <HeartIcon className="h-6 w-6" filled={isFavorite(content.id)} />
              </button>
            </div>
          </div>
        </div>

        {content.type === 'series' && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-4">Episodios</h2>
            <div className="space-y-4">
              {series.episodes.map((episode, index) => (
                <Link
                  key={episode.id}
                  to={`/player/series/${series.id}/${episode.id}`}
                  className="block p-4 bg-light-card dark:bg-dark-card rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
                >
                  <div className="flex items-center space-x-4">
                    <span className="text-2xl font-bold text-gray-500">{index + 1}</span>
                    <img src={episode.thumbnail} alt={episode.title} className="w-32 h-20 object-cover rounded-md"/>
                    <div>
                      <h3 className="font-bold">{episode.title}</h3>
                      <p className="text-sm text-gray-400 line-clamp-2">{episode.description}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DetailPage;
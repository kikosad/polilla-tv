
import React, { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useCatalog } from '../contexts/CatalogContext';
import ContentCard from '../components/ContentCard';
import { Content } from '../types';

const SearchPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { catalog, genres } = useCatalog();
  
  const query = searchParams.get('q') || '';
  const genreFilter = searchParams.get('genre') || '';
  const typeFilter = searchParams.get('type') || '';
  const yearFilter = searchParams.get('year') || '';

  const years = useMemo(() => {
    const allYears = new Set<number>();
    [...catalog.movies, ...catalog.series].forEach(item => {
      if ('year' in item) {
        allYears.add(item.year);
      }
    });
    return Array.from(allYears).sort((a, b) => b - a);
  }, [catalog.movies, catalog.series]);

  const updateSearchParam = (key: string, value: string) => {
    setSearchParams(prev => {
      if (value) {
        prev.set(key, value);
      } else {
        prev.delete(key);
      }
      return prev;
    });
  };

  const filteredContent = useMemo(() => {
    let allContent: Content[] = [...catalog.movies, ...catalog.series];

    if (query) {
      allContent = allContent.filter(item =>
        'title' in item && item.title.toLowerCase().includes(query.toLowerCase())
      );
    }
    
    if (genreFilter) {
      allContent = allContent.filter(item =>
        'genre' in item && item.genre.includes(genreFilter)
      );
    }

    if (typeFilter) {
        allContent = allContent.filter(item => item.type === typeFilter);
    }

    if (yearFilter) {
        allContent = allContent.filter(item => 'year' in item && item.year.toString() === yearFilter);
    }

    return allContent;
  }, [catalog, query, genreFilter, typeFilter, yearFilter]);

  return (
    <div className="min-h-screen container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-light-text dark:text-dark-text">
        {query ? `Resultados para "${query}"` : 'Explorar Contenido'}
      </h1>

      <div className="mb-8 flex flex-wrap gap-4">
        <select
          value={genreFilter}
          onChange={(e) => updateSearchParam('genre', e.target.value)}
          className="bg-light-card dark:bg-dark-card text-light-text dark:text-dark-text p-2 rounded-md border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <option value="">Todos los Géneros</option>
          {genres.map(genre => (
            <option key={genre} value={genre}>{genre}</option>
          ))}
        </select>
        <select
          value={typeFilter}
          onChange={(e) => updateSearchParam('type', e.target.value)}
          className="bg-light-card dark:bg-dark-card text-light-text dark:text-dark-text p-2 rounded-md border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <option value="">Todos los Tipos</option>
          <option value="movie">Películas</option>
          <option value="series">Series</option>
        </select>
        <select
          value={yearFilter}
          onChange={(e) => updateSearchParam('year', e.target.value)}
          className="bg-light-card dark:bg-dark-card text-light-text dark:text-dark-text p-2 rounded-md border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <option value="">Todos los Años</option>
          {years.map(year => (
            <option key={year} value={year}>{year}</option>
          ))}
        </select>
      </div>

      {filteredContent.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {filteredContent.map(item => (
            <ContentCard key={`${item.type}-${item.id}`} item={item} />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 mt-10">No se encontraron resultados para tus criterios.</p>
      )}
    </div>
  );
};

export default SearchPage;
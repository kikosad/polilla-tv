import React, { createContext, useContext, useMemo } from 'react';
import { Movie, Series, Channel } from '../types';

interface Catalog {
  movies: Movie[];
  series: Series[];
  channels: Channel[];
}

// The catalog data is now included locally to make the app faster and enable offline access.
const localCatalog: Catalog = {
  "movies": [
    {
      "id": "movie-pelisflix-1",
      "type": "movie",
      "title": "La Conductora",
      "description": "Una antigua conductora de fugas adolescente se ve arrastrada de nuevo a su desagradable pasado cuando su familia se ve amenazada.",
      "poster": "https://s.pelisflix20.mom/p/v2/w0/Vc5NLoeCOgLNh9X2.webp",
      "banner": "https://s.pelisflix20.mom/p/v2/w0/Vc5NLoeCOgLNh9X2.webp",
      "genre": ["Acción", "Comedia"],
      "year": 2025,
      "duration": "1h 46min",
      "url": "https://pelisflix20.mom/pelicula/la-conductora/",
      "subtitles": ""
    },
    {
      "id": "movie-pelisflix-2",
      "type": "movie",
      "title": "Demolición",
      "description": "Un exitoso banquero de inversión lucha después de perder a su esposa en un trágico accidente automovilístico.",
      "poster": "https://s.pelisflix20.mom/p/v2/w0/QQ6ugC186yI8AaEo62RBGE28CZ2HaIiRp.webp",
      "banner": "https://s.pelisflix20.mom/p/v2/w0/QQ6ugC186yI8AaEo62RBGE28CZ2HaIiRp.webp",
      "genre": ["Comedia", "Drama"],
      "year": 2016,
      "duration": "1h 41min",
      "url": "https://pelisflix20.mom/pelicula/demolicion/",
      "subtitles": ""
    },
    {
      "id": "movie-1",
      "type": "movie",
      "title": "La Noche de los Muertos Vivientes",
      "description": "Un grupo de personas se esconde de zombis sedientos de sangre en una granja.",
      "poster": "https://m.media-amazon.com/images/M/MV5BMTY5ODk1OTI5OV5BMl5BanBnXkFtZTgwODA0MzA5MTE@._V1_SX300.jpg",
      "banner": "https://images.fanart.tv/fanart/night-of-the-living-dead-50157462734a7.jpg",
      "genre": ["Terror", "Ciencia Ficción"],
      "year": 1968,
      "duration": "1h 36min",
      "url": "https://archive.org/download/NightOfTheLivingDead_489/NightOfTheLivingDead_489.mp4",
      "subtitles": "https://archive.org/download/NightOfTheLivingDead_489/NightOfTheLivingDead_489.vtt"
    },
    {
        "id": "movie-2",
        "type": "movie",
        "title": "El Maquinista de la General",
        "description": "Un maquinista lucha contra espías de la Unión durante la Guerra Civil Estadounidense.",
        "poster": "https://m.media-amazon.com/images/M/MV5BYmRiMDFlYjYtOTMwYy00OGY2LWE0Y2QtYzQxYjU0NTA3NDMyXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg",
        "banner": "https://www.themoviedb.org/t/p/original/6oWf8hFNBztYqIOqA32f6j9aI6s.jpg",
        "genre": ["Acción", "Aventura", "Comedia"],
        "year": 1926,
        "duration": "1h 18min",
        "url": "https://archive.org/download/TheGeneral_1926/TheGeneral_1926.mp4",
        "subtitles": ""
    },
    {
      "id": "movie-3",
      "type": "movie",
      "title": "Charada",
      "description": "Una mujer es perseguida por varios hombres que quieren una fortuna que su esposo asesinado había robado.",
      "poster": "https://m.media-amazon.com/images/M/MV5BMTQzMTcyODY2Nl5BMl5BanBnXkFtZTcwNTE4MzExNA@@._V1_SX300.jpg",
      "banner": "https://www.themoviedb.org/t/p/original/71ssKxZNwYseQ1S1YPS2a5lGf7.jpg",
      "genre": ["Comedia", "Misterio", "Romance"],
      "year": 1963,
      "duration": "1h 53min",
      "url": "https://archive.org/download/Charade1963/Charade1963.mp4",
      "subtitles": ""
    }
  ],
  "series": [
    {
      "id": "series-pelisflix-1",
      "type": "series",
      "title": "Invasion",
      "description": "La llegada de una especie alienígena a la Tierra pone en peligro a toda la humanidad. Sigue los acontecimientos a través de los ojos de cinco personas normales de diferentes partes del mundo que luchan por encontrarle sentido al caos que las rodea.",
      "poster": "https://s.pelisflix20.mom/p/v2/w0/RDkWT7ZeonRFNTWjlEzNfJZ.webp",
      "banner": "https://s.pelisflix20.mom/p/v2/w0/RDkWT7ZeonRFNTWjlEzNfJZ.webp",
      "genre": ["Ciencia Ficción", "Drama"],
      "year": 2021,
      "episodes": [
        {
          "id": "s-pf1-e1",
          "title": "Ver Temporadas",
          "description": "Haz clic para ver todos los episodios en la página de la serie.",
          "thumbnail": "https://s.pelisflix20.mom/p/v2/w0/RDkWT7ZeonRFNTWjlEzNfJZ.webp",
          "url": "https://pelisflix20.mom/serie/invasion-2021-zcmj/"
        }
      ]
    },
    {
      "id": "series-pelisflix-2",
      "type": "series",
      "title": "Foundation",
      "description": "Basada en la fascinante obra de Isaac Asimov, Foundation gira en torno a un grupo de exiliados en el ocaso del Imperio Galáctico y su afán por salvar a la humanidad y reconstruir la civilización.",
      "poster": "https://s.pelisflix20.mom/p/v2/w0/oAWsV7bxnXR0X3kJ.webp",
      "banner": "https://s.pelisflix20.mom/p/v2/w0/oAWsV7bxnXR0X3kJ.webp",
      "genre": ["Acción", "Aventura", "Ciencia Ficción"],
      "year": 2021,
      "episodes": [
        {
          "id": "s-pf2-e1",
          "title": "Ver Temporadas",
          "description": "Haz clic para ver todos los episodios en la página de la serie.",
          "thumbnail": "https://s.pelisflix20.mom/p/v2/w0/oAWsV7bxnXR0X3kJ.webp",
          "url": "https://pelisflix20.mom/serie/foundation-znqp/"
        }
      ]
    },
    {
      "id": "series-1",
      "type": "series",
      "title": "El Show de Lucy",
      "description": "Las desventuras de una madre viuda y sus dos hijos.",
      "poster": "https://m.media-amazon.com/images/M/MV5BMTg2MzQ0Mzg4MV5BMl5BanBnXkFtZTgwOTY5MjE1MjE@._V1_SX300.jpg",
      "banner": "https://www.themoviedb.org/t/p/original/vjQJ3EHYT0bEcHxyO3KgXwJprmu.jpg",
      "genre": ["Comedia"],
      "year": 1962,
      "episodes": [
        {
          "id": "s1e1",
          "title": "Lucy y el Submarino",
          "description": "Lucy y Viv deciden construir un submarino para ganar un concurso.",
          "thumbnail": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRz8o2R5X_a_D_9Qj8q8Y6A_Z6z5j_q_i1yA&s",
          "url": "https://archive.org/download/TheLucyShowS01E01LucyAndTheSubmarine/TheLucyShowS01E01LucyAndTheSubmarine.mp4"
        },
        {
            "id": "s1e2",
            "title": "Lucy y la Fábrica de Café",
            "description": "Lucy acepta un trabajo en una fábrica de granos de café para demostrar que puede mantener un empleo.",
            "thumbnail": "https://www.themoviedb.org/t/p/w500/7y8q9a1b2c3d4e5f6g7h8i9j0k.jpg",
            "url": "https://archive.org/download/TheLucyShowS01E02LucyAndTheBeanery/TheLucyShowS01E02LucyAndTheBeanery.mp4"
        }
      ]
    }
  ],
  "channels": [
    {
      "id": "channel-1",
      "type": "channel",
      "name": "TV de Dominio Público",
      "logo": "https://archive.org/services/img/publicdomaintelevision",
      "url": "https://archive.org/download/publicdomaintelevision/publicdomaintelevision.m3u8"
    },
    {
      "id": "channel-2",
      "type": "channel",
      "name": "Películas Clásicas",
      "logo": "https://archive.org/services/img/classic_movies",
      "url": "https://archive.org/download/classic_movies/classic_movies.m3u8"
    },
    {
      "id": "channel-3",
      "type": "channel",
      "name": "TNT",
      "logo": "https://i.imgur.com/bYSAi8s.png",
      "url": "https://tvlibreonline.org/en-vivo/tnt/"
    },
    {
      "id": "channel-telefe",
      "type": "channel",
      "name": "Telefe",
      "logo": "https://tvlibreonline.org/img/telefe.png",
      "url": "https://tvlibreonline.org/en-vivo/telefe/"
    },
    {
      "id": "channel-eltrece",
      "type": "channel",
      "name": "El Trece",
      "logo": "https://tvlibreonline.org/img/eltrece.webp",
      "url": "https://tvlibreonline.org/en-vivo/el-trece/"
    },
    {
      "id": "channel-tycsports",
      "type": "channel",
      "name": "TyC Sports",
      "logo": "https://tvlibreonline.org//img/tyc.webp",
      "url": "https://tvlibreonline.org/en-vivo/tyc-sports/"
    },
    {
      "id": "channel-espn-premium",
      "type": "channel",
      "name": "ESPN Premium",
      "logo": "https://tvlibreonline.org//img/espnpr.webp",
      "url": "https://tvlibreonline.org/en-vivo/espn-premium/"
    },
    {
      "id": "channel-tn",
      "type": "channel",
      "name": "TN",
      "logo": "https://tvlibreonline.org/img/tn.png",
      "url": "https://tvlibreonline.org/en-vivo/tn/"
    },
    {
      "id": "channel-cronica",
      "type": "channel",
      "name": "Crónica TV",
      "logo": "https://tvlibreonline.org/img/cronica.png",
      "url": "https://tvlibreonline.org/en-vivo/cronica/"
    },
    {
      "id": "channel-america",
      "type": "channel",
      "name": "América TV",
      "logo": "https://tvlibreonline.org/img/america.webp",
      "url": "https://tvlibreonline.org/en-vivo/america-tv/"
    },
    {
      "id": "channel-c5n",
      "type": "channel",
      "name": "C5N",
      "logo": "https://tvlibreonline.org/img/c5n.webp",
      "url": "https://tvlibreonline.org/en-vivo/c5n/"
    },
    {
      "id": "channel-tvpublica",
      "type": "channel",
      "name": "TV Pública",
      "logo": "https://tvlibreonline.org/img/tvpublica.webp",
      "url": "https://tvlibreonline.org/en-vivo/tv-publica/"
    },
    {
      "id": "channel-elnueve",
      "type": "channel",
      "name": "El Nueve",
      "logo": "https://tvlibreonline.org/img/nueve.webp",
      "url": "https://tvlibreonline.org/en-vivo/el-nueve/"
    },
     {
      "id": "channel-dsports",
      "type": "channel",
      "name": "DSports",
      "logo": "https://tvlibreonline.org//img/dsports.webp",
      "url": "https://tvlibreonline.org/en-vivo/dsports/"
    },
    {
      "id": "channel-espn",
      "type": "channel",
      "name": "ESPN",
      "logo": "https://tvlibreonline.org//img/espn.webp",
      "url": "https://tvlibreonline.org/en-vivo/espn/"
    },
    {
      "id": "channel-fox-sports",
      "type": "channel",
      "name": "Fox Sports",
      "logo": "https://tvlibreonline.org//img/foxsports.png",
      "url": "https://tvlibreonline.org/en-vivo/fox-sports/"
    },
    {
      "id": "channel-tnt-sports",
      "type": "channel",
      "name": "TNT Sports Premium",
      "logo": "https://tvlibreonline.org//img/tntar.svg",
      "url": "https://tvlibreonline.org/en-vivo/tnt-sports/"
    }
  ]
};

interface CatalogContextType {
  catalog: Catalog;
  genres: string[];
}

const CatalogContext = createContext<CatalogContextType | undefined>(undefined);

export const CatalogProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const catalog: Catalog = localCatalog;

  const genres = useMemo(() => {
    const allGenres = new Set<string>();
    catalog.movies.forEach(movie => movie.genre.forEach(g => allGenres.add(g)));
    catalog.series.forEach(s => s.genre.forEach(g => allGenres.add(g)));
    return Array.from(allGenres).sort();
  }, [catalog]);

  const value = useMemo(() => ({ catalog, genres }), [catalog, genres]);

  return (
    <CatalogContext.Provider value={value}>
      {children}
    </CatalogContext.Provider>
  );
};

export const useCatalog = (): CatalogContextType => {
  const context = useContext(CatalogContext);
  if (context === undefined) {
    throw new Error('useCatalog must be used within a CatalogProvider');
  }
  return context;
};

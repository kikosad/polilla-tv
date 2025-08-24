import React, { createContext, useContext, useState, useCallback, useMemo, Dispatch, SetStateAction } from 'react';
import { ContinueWatchingInfo } from '../types';

type Favorites = string[];
type ContinueWatching = Record<string, ContinueWatchingInfo>;

interface UserDataContextType {
  favorites: Favorites;
  continueWatching: ContinueWatching;
  isFavorite: (id: string) => boolean;
  toggleFavorite: (id: string) => void;
  updateContinueWatching: (id: string, info: ContinueWatchingInfo) => void;
  getContinueWatchingInfo: (id: string) => ContinueWatchingInfo | undefined;
}

const UserDataContext = createContext<UserDataContextType | undefined>(undefined);

const useLocalStorage = <T,>(key: string, initialValue: T): [T, Dispatch<SetStateAction<T>>] => {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  const setValue: Dispatch<SetStateAction<T>> = (value) => {
    try {
      // Use the functional update form of useState's setter to ensure we always have the latest state
      setStoredValue(currentState => {
          const valueToStore = value instanceof Function ? value(currentState) : value;
          window.localStorage.setItem(key, JSON.stringify(valueToStore));
          return valueToStore;
      });
    } catch (error) {
      console.error(error);
    }
  };
  return [storedValue, setValue];
};

export const UserDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [favorites, setFavorites] = useLocalStorage<Favorites>('favorites', []);
  const [continueWatching, setContinueWatching] = useLocalStorage<ContinueWatching>('continueWatching', {});

  const isFavorite = useCallback((id: string) => favorites.includes(id), [favorites]);

  const toggleFavorite = useCallback((id: string) => {
    setFavorites(prev =>
      prev.includes(id) ? prev.filter(favId => favId !== id) : [...prev, id]
    );
  }, [setFavorites]);
  
  const updateContinueWatching = useCallback((id: string, info: ContinueWatchingInfo) => {
    setContinueWatching(prev => ({ ...prev, [id]: info }));
  }, [setContinueWatching]);

  const getContinueWatchingInfo = useCallback((id: string) => {
    return continueWatching[id];
  }, [continueWatching]);

  const value = useMemo(() => ({
    favorites,
    continueWatching,
    isFavorite,
    toggleFavorite,
    updateContinueWatching,
    getContinueWatchingInfo,
  }), [favorites, continueWatching, isFavorite, toggleFavorite, updateContinueWatching, getContinueWatchingInfo]);

  return (
    <UserDataContext.Provider value={value}>
      {children}
    </UserDataContext.Provider>
  );
};

export const useUserData = (): UserDataContextType => {
  const context = useContext(UserDataContext);
  if (!context) {
    throw new Error('useUserData must be used within a UserDataProvider');
  }
  return context;
};
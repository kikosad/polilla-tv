
import React from 'react';
import { HashRouter, Routes, Route, Outlet } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { CatalogProvider } from './contexts/CatalogContext';
import { UserDataProvider } from './contexts/UserDataContext';

import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import DetailPage from './pages/DetailPage';
import PlayerPage from './pages/PlayerPage';
import SearchPage from './pages/SearchPage';

const Layout: React.FC = () => (
  <div className="flex flex-col min-h-screen font-sans text-light-text dark:text-dark-text bg-light-bg dark:bg-dark-bg transition-colors duration-300">
    <Header />
    <main className="flex-grow">
      <Outlet />
    </main>
    <Footer />
  </div>
);

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <CatalogProvider>
        <UserDataProvider>
          <HashRouter>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<HomePage />} />
                <Route path="details/:type/:id" element={<DetailPage />} />
                <Route path="search" element={<SearchPage />} />
              </Route>
              <Route path="player/:type/:id" element={<PlayerPage />} />
              <Route path="player/:type/:id/:episodeId" element={<PlayerPage />} />
            </Routes>
          </HashRouter>
        </UserDataProvider>
      </CatalogProvider>
    </ThemeProvider>
  );
};

export default App;

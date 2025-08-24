
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-light-card dark:bg-dark-card mt-auto">
      <div className="container mx-auto px-4 py-6 text-center text-gray-500 dark:text-gray-400">
        <p>&copy; {new Date().getFullYear()} Cine Polilla. Todo el contenido es de dominio público o fuentes abiertas.</p>
        <p className="text-sm mt-1">Esta es una aplicación ficticia para fines de demostración.</p>
      </div>
    </footer>
  );
};

export default Footer;
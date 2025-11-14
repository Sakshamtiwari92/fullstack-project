import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-gray-900/70 backdrop-blur-md border-b border-gray-700/50 p-4 shadow-lg sticky top-0 z-10">
      <h1 className="text-xl md:text-2xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-fuchsia-500">
        Dit Navneet Chatbot
      </h1>
    </header>
  );
};

export default Header;


import React from 'react';

const TypingIndicator: React.FC = () => {
  return (
    <div className="flex justify-start items-start gap-3">
      <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center font-bold text-white flex-shrink-0">
        AI
      </div>
      <div className="bg-gray-700/80 rounded-r-2xl rounded-tl-2xl p-4 flex items-center space-x-2">
        <div className="w-2.5 h-2.5 bg-gray-400 rounded-full animate-pulse [animation-delay:-0.3s]"></div>
        <div className="w-2.5 h-2.5 bg-gray-400 rounded-full animate-pulse [animation-delay:-0.15s]"></div>
        <div className="w-2.5 h-2.5 bg-gray-400 rounded-full animate-pulse"></div>
      </div>
    </div>
  );
};

export default TypingIndicator;

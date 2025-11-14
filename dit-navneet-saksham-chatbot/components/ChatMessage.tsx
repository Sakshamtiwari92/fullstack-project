import React from 'react';
import { Message } from '../types';

interface ChatMessageProps {
  message: Message;
}

const UserIcon = () => (
    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center font-bold text-white flex-shrink-0 shadow-md">
        U
    </div>
);

const ModelIcon = () => (
    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-purple-700 flex items-center justify-center font-bold text-white flex-shrink-0 shadow-md">
        AI
    </div>
);

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isUser = message.role === 'user';
  
  const messageContainerClasses = isUser 
    ? 'flex justify-end items-start gap-3' 
    : 'flex justify-start items-start gap-3';
    
  const messageBubbleClasses = isUser
    ? 'bg-blue-600/90 rounded-l-2xl rounded-tr-2xl'
    : 'bg-gray-700/90 rounded-r-2xl rounded-tl-2xl';

  return (
    <div className={`${messageContainerClasses} animate-fade-in-up`}>
      {!isUser && <ModelIcon />}
      <div className={`p-1.5 max-w-lg md:max-w-xl text-white ${messageBubbleClasses} shadow-lg`}>
        <div className="p-2.5">
            {message.image && (
                <img 
                    src={message.image} 
                    alt="User upload" 
                    className="rounded-lg mb-2 max-w-full h-auto"
                />
            )}
            {message.text && <p className="whitespace-pre-wrap">{message.text}</p>}
        </div>
      </div>
      {isUser && <UserIcon />}
    </div>
  );
};

export default ChatMessage;

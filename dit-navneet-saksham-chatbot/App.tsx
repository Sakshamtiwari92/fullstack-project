import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Message } from './types';
import { sendMessageToGemini } from './services/geminiService';
import Header from './components/Header';
import ChatMessage from './components/ChatMessage';
import ChatInput from './components/ChatInput';
import TypingIndicator from './components/TypingIndicator';

const App: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: 'Hello! I am Dit Navneet Chatbot. How can I help you today? You can also upload an image.' }
  ]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSendMessage = useCallback(async (inputText: string, imageBase64: string | null) => {
    if (!inputText.trim() && !imageBase64) return;

    const userMessage: Message = { role: 'user', text: inputText, image: imageBase64 ?? undefined };
    setMessages(prevMessages => [...prevMessages, userMessage]);
    setIsLoading(true);
    setError(null);

    try {
      const modelResponse = await sendMessageToGemini(inputText, imageBase64);
      const modelMessage: Message = { role: 'model', text: modelResponse };
      setMessages(prevMessages => [...prevMessages, modelMessage]);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred.';
      setError(`Failed to get response from AI. ${errorMessage}`);
      const errorResponseMessage: Message = { role: 'model', text: `Sorry, I encountered an error. Please try again.` };
       setMessages(prevMessages => [...prevMessages, errorResponseMessage]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <div className="flex flex-col h-screen bg-gray-900 text-white font-sans">
      <Header />
      <main className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 max-w-4xl mx-auto w-full">
        {messages.map((msg, index) => (
          <ChatMessage key={index} message={msg} />
        ))}
        {isLoading && <TypingIndicator />}
        {error && (
            <div className="flex justify-start animate-fade-in-up">
                 <div className="bg-red-900/50 border border-red-700 text-red-300 p-3 rounded-lg max-w-xl">
                    <p className="font-bold mb-1">Error</p>
                    <p>{error}</p>
                </div>
            </div>
        )}
        <div ref={messagesEndRef} />
      </main>
      <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
    </div>
  );
};

export default App;

import React, { useState, useRef, useEffect } from 'react';

interface ChatInputProps {
  onSendMessage: (text: string, image: string | null) => void;
  isLoading: boolean;
}

const SendIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
        <path d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z" />
    </svg>
);

const AttachmentIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
        <path fillRule="evenodd" d="M18.97 3.659a2.25 2.25 0 0 0-3.182 0l-10.5 10.5a.75.75 0 0 0 1.06 1.06l10.5-10.5a.75.75 0 0 1 1.06 0l-9 9a2.25 2.25 0 0 0 0 3.182 2.25 2.25 0 0 0 3.182 0l9-9a.75.75 0 0 1 1.06 0l-9 9a3.75 3.75 0 1 1-5.303-5.303l10.5-10.5a3.75 3.75 0 1 1 5.303 5.303l-10.5 10.5a.75.75 0 0 0 1.06 1.06l10.5-10.5a2.25 2.25 0 0 0 0-3.182Z" clipRule="evenodd" />
    </svg>
);


const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, isLoading }) => {
  const [inputText, setInputText] = useState('');
  const [imageBase64, setImageBase64] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto'; // Reset height
      const scrollHeight = textarea.scrollHeight;
      textarea.style.height = `${scrollHeight}px`; // Set to content height
    }
  }, [inputText]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageBase64(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
    // Reset file input value to allow re-selection of the same file
    event.target.value = '';
  };

  const handleRemoveImage = () => {
    setImageBase64(null);
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isLoading || (!inputText.trim() && !imageBase64)) return;
    onSendMessage(inputText, imageBase64);
    setInputText('');
    setImageBase64(null);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
        event.preventDefault();
        handleSubmit(event as any);
    }
  };

  return (
    <footer className="bg-gray-900/70 backdrop-blur-md border-t border-gray-700/50 p-4 sticky bottom-0">
      <div className="max-w-4xl mx-auto">
        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
            {imageBase64 && (
                <div className="relative w-24 h-24 p-1 bg-gray-700 rounded-lg">
                    <img src={imageBase64} alt="Preview" className="w-full h-full object-cover rounded" />
                    <button
                        type="button"
                        onClick={handleRemoveImage}
                        className="absolute -top-2 -right-2 bg-gray-800 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-500 transition-colors"
                        aria-label="Remove image"
                    >
                        &times;
                    </button>
                </div>
            )}
            <div className="flex items-end gap-3">
                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    accept="image/*"
                    className="hidden"
                    disabled={isLoading}
                />
                 <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={isLoading}
                    className="text-gray-400 hover:text-white disabled:opacity-50 transition-colors p-3"
                    aria-label="Attach file"
                >
                    <AttachmentIcon />
                </button>
                <textarea
                    ref={textareaRef}
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Type your message or upload an image..."
                    className="flex-1 bg-gray-700 text-white rounded-lg p-3 resize-none focus:ring-2 focus:ring-blue-500 focus:outline-none disabled:opacity-50 max-h-40"
                    disabled={isLoading}
                    rows={1}
                />
                <button
                    type="submit"
                    disabled={isLoading || (!inputText.trim() && !imageBase64)}
                    className="bg-blue-600 text-white rounded-full p-3 hover:bg-blue-500 disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors duration-200 self-end"
                    aria-label="Send message"
                >
                    <SendIcon />
                </button>
            </div>
        </form>
      </div>
    </footer>
  );
};

export default ChatInput;

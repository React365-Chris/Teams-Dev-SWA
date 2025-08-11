import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Bot, User, Copy, ThumbsUp, ThumbsDown, RotateCcw, Volume2 } from 'lucide-react';
import { Message } from '../types/chat';

interface MessageBubbleProps {
  message: Message;
  isLatest?: boolean;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message, isLatest = false }) => {
  const isUser = message.role === 'user';
  
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    });
  };

  return (
    <div className={`flex items-start space-x-3 mb-6 animate-fade-in ${isUser ? 'justify-end' : ''}`}>
      {!isUser && (
        <div className="flex-shrink-0 w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
          <Bot size={16} className="text-purple-600" />
        </div>
      )}
      
      <div className={`flex-1 max-w-3xl ${isUser ? 'flex justify-end' : ''}`}>
        {!isUser && (
          <div className="flex items-center space-x-2 mb-2">
            <span className="text-sm font-medium text-gray-900">Copilot</span>
            <div className="w-4 h-4 bg-purple-100 rounded-full flex items-center justify-center">
              <span className="text-xs text-purple-600">?</span>
            </div>
          </div>
        )}
        
        <div className={`${
          isUser 
            ? 'bg-blue-600 text-white rounded-lg px-4 py-2 max-w-md ml-auto' 
            : 'bg-transparent'
        }`}>
          {isUser ? (
            <p className="text-sm">{message.content}</p>
          ) : (
            <div className="prose prose-sm max-w-none">
              <ReactMarkdown 
                remarkPlugins={[remarkGfm]}
                components={{
                  p: ({ children }) => <p className="text-gray-700 mb-3 last:mb-0">{children}</p>,
                  strong: ({ children }) => <strong className="font-semibold text-gray-900">{children}</strong>,
                  em: ({ children }) => <em className="italic text-gray-700">{children}</em>,
                  ol: ({ children }) => <ol className="list-decimal list-inside space-y-2 mb-4">{children}</ol>,
                  ul: ({ children }) => <ul className="list-disc list-inside space-y-2 mb-4">{children}</ul>,
                  li: ({ children }) => <li className="text-gray-700">{children}</li>,
                  code: ({ children }) => <code className="bg-gray-100 px-1 py-0.5 rounded text-sm font-mono">{children}</code>,
                  pre: ({ children }) => <pre className="bg-gray-100 p-3 rounded-lg overflow-x-auto mb-4">{children}</pre>,
                }}
              >
                {message.content}
              </ReactMarkdown>
            </div>
          )}
        </div>
        
        {!isUser && isLatest && (
          <div className="flex items-center space-x-2 mt-3">
            <button
              className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded transition-colors"
              title="Copy message"
              aria-label="Copy message"
            >
              <Copy size={14} />
            </button>
            <button
              className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded transition-colors"
              title="Thumbs up"
              aria-label="Thumbs up"
            >
              <ThumbsUp size={14} />
            </button>
            <button
              className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded transition-colors"
              title="Thumbs down"
              aria-label="Thumbs down"
            >
              <ThumbsDown size={14} />
            </button>
            <button
              className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded transition-colors"
              title="Regenerate"
              aria-label="Regenerate"
            >
              <RotateCcw size={14} />
            </button>
            <button
              className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded transition-colors"
              title="Read aloud"
              aria-label="Read aloud"
            >
              <Volume2 size={14} />
            </button>
          </div>
        )}
        
        {isUser && (
          <div className="text-xs text-gray-500 mt-1 text-right">
            {formatTime(message.timestamp)}
          </div>
        )}
      </div>
      
      {isUser && (
        <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
          <User size={16} className="text-blue-600" />
        </div>
      )}
    </div>
  );
};

export default MessageBubble;
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
        <div className="flex-shrink-0 w-8 h-8 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center">
          <Bot size={16} className="text-purple-600 dark:text-purple-300" />
        </div>
      )}
      
      <div className={`flex-1 max-w-3xl ${isUser ? 'flex justify-end' : ''}`}>
        {!isUser && (
          <div className="flex items-center space-x-2 mb-2">
            <span className="text-sm font-medium text-gray-900 dark:text-gray-100">Secure Chat</span>
            <div className="w-4 h-4 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center">
              <span className="text-xs text-purple-600 dark:text-purple-300">?</span>
            </div>
          </div>
        )}
        
        <div className={`${
          isUser 
            ? 'bg-[var(--color-accent)] text-white rounded-xl px-4 py-2 max-w-md ml-auto' 
            : 'bg-gray-50 dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 rounded-xl px-4 py-3'
        }`}>
          {isUser ? (
            <p className="text-sm">{message.content}</p>
          ) : (
            <div className="prose prose-sm max-w-none prose-p:text-gray-700 dark:prose-invert">
              <ReactMarkdown 
                remarkPlugins={[remarkGfm]}
                components={{
                  p: ({ children }) => <p className="text-gray-700 dark:text-gray-200 mb-3 last:mb-0">{children}</p>,
                  strong: ({ children }) => <strong className="font-semibold text-gray-900 dark:text-gray-100">{children}</strong>,
                  em: ({ children }) => <em className="italic text-gray-700 dark:text-gray-200">{children}</em>,
                  ol: ({ children }) => <ol className="list-decimal list-inside space-y-2 mb-4">{children}</ol>,
                  ul: ({ children }) => <ul className="list-disc list-inside space-y-2 mb-4">{children}</ul>,
                  li: ({ children }) => <li className="text-gray-700 dark:text-gray-200">{children}</li>,
                  code: ({ children }) => <code className="bg-gray-100 dark:bg-neutral-700 px-1 py-0.5 rounded text-sm font-mono">{children}</code>,
                  pre: ({ children }) => <pre className="bg-gray-100 dark:bg-neutral-800 p-3 rounded-lg overflow-x-auto mb-4">{children}</pre>,
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
      className="p-1.5 text-gray-400 dark:text-gray-300 hover:text-gray-600 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-neutral-800 rounded transition-colors"
              title="Copy message"
              aria-label="Copy message"
            >
              <Copy size={14} />
            </button>
            <button
      className="p-1.5 text-gray-400 dark:text-gray-300 hover:text-gray-600 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-neutral-800 rounded transition-colors"
              title="Thumbs up"
              aria-label="Thumbs up"
            >
              <ThumbsUp size={14} />
            </button>
            <button
      className="p-1.5 text-gray-400 dark:text-gray-300 hover:text-gray-600 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-neutral-800 rounded transition-colors"
              title="Thumbs down"
              aria-label="Thumbs down"
            >
              <ThumbsDown size={14} />
            </button>
            <button
      className="p-1.5 text-gray-400 dark:text-gray-300 hover:text-gray-600 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-neutral-800 rounded transition-colors"
              title="Regenerate"
              aria-label="Regenerate"
            >
              <RotateCcw size={14} />
            </button>
            <button
      className="p-1.5 text-gray-400 dark:text-gray-300 hover:text-gray-600 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-neutral-800 rounded transition-colors"
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
        <div className="flex-shrink-0 w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
          <User size={16} className="text-blue-600 dark:text-blue-300" />
        </div>
      )}
    </div>
  );
};

export default MessageBubble;
import React, { useState, useRef, useEffect } from 'react';
import { Mic, Plus, Smile, Lightbulb, AlertTriangle, Send } from 'lucide-react';
import { useChat } from '../hooks/useChat';
import MessageBubble from './MessageBubble';
import TypingIndicator from './TypingIndicator';
import SuggestionChips from './SuggestionChips';

interface SuggestionCard {
  id: string;
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  color: string;
}

// No props are required for ChatInterface
type ChatInterfaceProps = object;

const ChatInterface: React.FC<ChatInterfaceProps> = () => {
  const [message, setMessage] = useState('');
  const { currentConversation, isTyping, sendMessage } = useChat();
  const hasMessages = currentConversation && currentConversation.messages.length > 0;
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to latest message
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [currentConversation?.messages.length, isTyping]);

  const suggestions: SuggestionCard[] = [
    {
      id: '1',
      icon: <Smile className="text-orange-600" size={20} />,
      title: 'Suggest 5 office-friendly jokes',
      subtitle: 'Have a laugh',
      color: 'bg-orange-50 border-orange-200 hover:bg-orange-100'
    },
    {
      id: '2',
      icon: <Lightbulb className="text-yellow-600" size={20} />,
      title: 'Come up with 3 ideas business plans for merging technology',
      subtitle: 'Nearly half way',
      color: 'bg-yellow-50 border-yellow-200 hover:bg-yellow-100'
    },
    {
      id: '3',
      icon: <AlertTriangle className="text-blue-600" size={20} />,
      title: 'How can I avoid common mistakes when proofreading in...',
      subtitle: 'Use the source',
      color: 'bg-blue-50 border-blue-200 hover:bg-blue-100'
    }
  ];

  const handleSuggestionClick = (suggestion: SuggestionCard) => {
    setMessage(suggestion.title);
  };

  const handleSendMessage = async () => {
    if (!message.trim()) return;
    
    const messageToSend = message;
    setMessage('');
    await sendMessage(messageToSend);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleSuggestionChipClick = (suggestion: string) => {
    setMessage(suggestion);
  };

  // Follow-up suggestions that appear after AI responses
  const followUpSuggestions = [
    "Make them tech industry themed.",
    "Add some puns about meetings.",
    "Give me short one-liners."
  ];

  return (
      <div className="flex-1 flex flex-col bg-white dark:bg-neutral-900 relative">
        <main className="flex-1 flex flex-col px-4 sm:px-6 pb-[104px]">
          {/* Make the message list scrollable above the input */}
          <div
            className="py-6"
            style={{
              maxHeight: 'calc(100vh - 120px)', // 120px = input height + padding
              overflowY: 'auto',
            }}
          >
            <div className="max-w-4xl mx-auto">
            {hasMessages ? (
              <>
                {/* Date separator */}
                <div className="text-center mb-6">
                  <span className="text-xs text-gray-500 dark:text-gray-400 bg-white dark:bg-neutral-900 px-3 py-1 rounded-full border border-gray-200 dark:border-neutral-800">
                    Today
                  </span>
                </div>
                {/* Messages */}
                {currentConversation?.messages.map((msg, index) => (
                  <MessageBubble 
                    key={msg.id} 
                    message={msg} 
                    isLatest={index === currentConversation.messages.length - 1 && msg.role === 'assistant'}
                  />
                ))}
                {/* Typing indicator */}
                {isTyping && <TypingIndicator />}
                {/* Follow-up suggestions */}
                {!isTyping && hasMessages && currentConversation?.messages[currentConversation.messages.length - 1]?.role === 'assistant' && (
                  <SuggestionChips 
                    suggestions={followUpSuggestions}
                    onSuggestionClick={handleSuggestionChipClick}
                  />
                )}
                {/* Scroll anchor */}
                <div ref={messagesEndRef} />
              </>
            ) : (
              <>
                {/* Greeting */}
                <div className="text-center mb-8">
                  <h3 className="text-xl sm:text-2xl font-medium text-gray-900 mb-4">Hi, how can I help?</h3>
                </div>
                {/* Suggestion Cards */}
                <div className="grid gap-3 sm:grid-cols-1 mb-8">
                  {suggestions.map((suggestion) => (
                    <button
                      key={suggestion.id}
                      onClick={() => handleSuggestionClick(suggestion)}
                      className={`w-full p-3 sm:p-4 border rounded-lg text-left transition-all ${suggestion.color} dark:bg-neutral-800 dark:border-neutral-700 dark:hover:bg-neutral-700`}
                    >
                      <div className="flex items-start space-x-3">
                        <div className="mt-0.5">
                          {suggestion.icon}
                        </div>
                        <div className="flex-1">
                          <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-1">
                            {suggestion.title}
                          </h4>
                          <p className="text-xs text-gray-600 dark:text-gray-300">
                            {suggestion.subtitle}
                          </p>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
                {/* See more link */}
                <div className="text-center">
                  <button className="text-sm text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white transition-colors">
                    See more →
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </main>
      {/* Message Input - Sticky at bottom */}
      <div className="fixed left-0 right-0 bottom-0 z-20 border-t border-gray-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-4 shadow-lg">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-end space-x-3">
            <button
              className="p-2 text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-white transition-colors rounded-md hover:bg-gray-100 dark:hover:bg-neutral-800"
              title="Add attachment"
              aria-label="Add attachment"
            >
              <Plus size={20} />
            </button>
            <div className="flex-1 relative">
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Message Secure Chat"
                className="w-full px-4 py-3 border border-gray-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-gray-900 dark:text-gray-100 rounded-lg resize-none focus:outline-none focus:border-[var(--color-accent)] focus:ring-1 focus:ring-[var(--color-accent)] transition-all chat-textarea"
                rows={1}
              />
            </div>
            <button
              className="p-2 text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-white transition-colors rounded-md hover:bg-gray-100 dark:hover:bg-neutral-800"
              title="Record voice message"
              aria-label="Record voice message"
            >
              <Mic size={20} />
            </button>
            <button 
              onClick={handleSendMessage}
              disabled={!message.trim()}
              className="p-2 text-[var(--color-accent)] hover:text-[var(--color-accent-strong)] disabled:text-gray-400 dark:disabled:text-gray-600 disabled:cursor-not-allowed transition-colors"
              title="Send message"
              aria-label="Send message"
            >
              <Send size={20} />
            </button>
          </div>
          {/* AI disclaimer */}
          <div className="text-center mt-2">
            <span className="text-xs text-gray-500 dark:text-gray-400">
              AI-generated content may be incorrect
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
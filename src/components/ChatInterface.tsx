
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useRef, useEffect } from 'react';
import { Mic, Plus, Smile, Lightbulb, AlertTriangle } from 'lucide-react';
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

interface ChatInterfaceProps {
  currentConversation: any;
  isTyping: boolean;
  sendMessage: (msg: string) => Promise<void>;
  startNewConversation: () => void;
  loadConversation: (id: string) => void;
  conversations: any[];
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ currentConversation, isTyping, sendMessage }) => {
  const [message, setMessage] = useState('');
  const hasMessages = currentConversation && currentConversation.messages.length > 0;
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Voice-to-text state and handler
  const [isRecording, setIsRecording] = useState(false);
  const recognitionRef = useRef<any>(null);
  const handleMicClick = () => {
    const SpeechRecognitionClass = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognitionClass) {
      alert('Speech recognition is not supported in this browser.');
      return;
    }
    if (isRecording) {
      recognitionRef.current?.stop();
      setIsRecording(false);
      return;
    }
    const recognition = new SpeechRecognitionClass();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setMessage((prev: string) => prev ? prev + ' ' + transcript : transcript);
      setIsRecording(false);
    };
    recognition.onerror = () => {
      setIsRecording(false);
    };
    recognition.onend = () => {
      setIsRecording(false);
    };
    recognitionRef.current = recognition;
    recognition.start();
    setIsRecording(true);
  };

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  }, []);

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

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
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
  <main className="flex-1 flex flex-col px-4 sm:px-6 pb-[148px]">
          {/* Make the message list scrollable above the input */}
          <div
            className="py-6 max-h-[calc(100vh-164px)] overflow-y-auto"
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
                {currentConversation?.messages.map((msg: import('../types/chat').Message, index: number) => (
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
                ref={textareaRef}
                className="w-full px-4 py-3 pr-12 border border-gray-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-gray-900 dark:text-gray-100 rounded-lg resize-none focus:outline-none focus:border-[var(--color-accent)] focus:ring-1 focus:ring-[var(--color-accent)] transition-all chat-textarea h-24"
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Message Secure Chat"
              />
              <button
                type="button"
                onClick={handleSendMessage}
                disabled={!message.trim()}
                className={`absolute bottom-4 right-2 p-2 bg-[var(--color-accent)] text-white rounded-full shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-opacity ${!message.trim() ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
                aria-label="Send message"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 21l18-9-18-9v7l13 2-13 2v7z" />
                </svg>
              </button>
              <button
                type="button"
                onClick={handleMicClick}
                className={`absolute bottom-2 p-2 text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-white transition-colors rounded-full hover:bg-gray-100 dark:hover:bg-neutral-800 transition-all duration-700 ${message.trim() ? 'right-12' : 'right-2'} ${isRecording ? 'animate-pulse bg-blue-100' : ''}`}
                title={isRecording ? "Listening..." : "Record voice message"}
                aria-label="Record voice message"
              >
                <Mic size={20} />
              </button>
            </div>
            {/* Mic button moved inside textarea container */}
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
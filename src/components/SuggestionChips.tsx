import React from 'react';

interface SuggestionChipsProps {
  suggestions: string[];
  onSuggestionClick: (suggestion: string) => void;
}

const SuggestionChips: React.FC<SuggestionChipsProps> = ({ suggestions, onSuggestionClick }) => {
  if (suggestions.length === 0) return null;

  return (
  <div className="flex flex-wrap gap-2 mb-4 animate-fade-in">
      {suggestions.map((suggestion, index) => (
        <button
          key={index}
          onClick={() => onSuggestionClick(suggestion)}
      className="px-3 py-2 bg-gray-100 dark:bg-neutral-800 hover:bg-gray-200 dark:hover:bg-neutral-700 text-gray-700 dark:text-gray-200 text-sm rounded-full border border-gray-200 dark:border-neutral-700 transition-colors"
        >
          {suggestion}
        </button>
      ))}
    </div>
  );
};

export default SuggestionChips;
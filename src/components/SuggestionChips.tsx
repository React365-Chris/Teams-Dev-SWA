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
          className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm rounded-full border border-gray-200 transition-colors"
        >
          {suggestion}
        </button>
      ))}
    </div>
  );
};

export default SuggestionChips;
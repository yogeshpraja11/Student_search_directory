import React from 'react';
import { Student } from '../types';

interface SearchResultsProps {
  results: Student[];
  searchQuery: string;
  onSelectStudent: (student: Student) => void;
}

const SearchResults: React.FC<SearchResultsProps> = ({ 
  results, 
  searchQuery, 
  onSelectStudent 
}) => {
  // Helper function to highlight matching text
  const highlightMatch = (text: string, query: string) => {
    if (!query || query.length < 3) return text;
    
    const regex = new RegExp(`(${query})`, 'gi');
    const parts = text.split(regex);
    
    return parts.map((part, index) => 
      regex.test(part) ? 
        <span key={index} className="bg-yellow-200 font-medium">{part}</span> : 
        <span key={index}>{part}</span>
    );
  };

  if (results.length === 0) {
    return (
      <div className="py-4 px-4 text-center text-gray-500">
        No students found matching "{searchQuery}"
      </div>
    );
  }

  return (
    <ul className="py-1">
      {results.map((student) => (
        <li key={student.rollNumber}>
          <button
            onClick={() => onSelectStudent(student)}
            className="w-full text-left px-4 py-3 hover:bg-indigo-50 focus:bg-indigo-50 focus:outline-none transition-colors duration-150"
          >
            <div className="font-medium text-indigo-800">
              {highlightMatch(student.name, searchQuery)}
            </div>
            <div className="text-sm text-gray-500 flex justify-between mt-1">
              <span>Class {student.class}</span>
              <span>Roll #{student.rollNumber}</span>
            </div>
          </button>
        </li>
      ))}
    </ul>
  );
};

export default SearchResults;
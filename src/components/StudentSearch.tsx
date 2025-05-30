import React, {useState, useEffect, useRef} from "react";
import {Search, User} from "lucide-react";
import StudentCard from "./StudentCard";
import {useDebounce} from "../hooks/useDebounce";
import {searchStudents} from "../services/api";
import {Student} from "../types";
import SearchResults from "./SearchResults";

const StudentSearch: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [results, setResults] = useState<Student[]>([]);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  // Handle outside click to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Fetch search results when debounced query changes
  useEffect(() => {
    const fetchResults = async () => {
      if (debouncedSearchQuery.length >= 3) {
        setIsLoading(true);
        try {
          const data = await searchStudents(debouncedSearchQuery);
          setResults(data.students);
          setShowDropdown(data.students.length > 0);
        } catch (error) {
          console.error("Error fetching results:", error);
          setResults([]);
        } finally {
          setIsLoading(false);
        }
      } else {
        setResults([]);
        setShowDropdown(false);
      }
    };

    fetchResults();
  }, [debouncedSearchQuery]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    if (value.length < 3) {
      setShowDropdown(false);
    }
  };

  const handleSelectStudent = (student: Student) => {
    setSelectedStudent(student);
    setSearchQuery("");
    setShowDropdown(false);
  };

  const handleClearSelection = () => {
    setSelectedStudent(null);
    setSearchQuery("");
    inputRef.current?.focus();
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="relative w-full mb-8">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            ref={inputRef}
            type="text"
            className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
            placeholder="Search students by name (min 3 characters)"
            value={searchQuery}
            onChange={handleInputChange}
            onFocus={() =>
              searchQuery.length >= 3 && setShowDropdown(results.length > 0)
            }
          />
          {isLoading && (
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
              <div className="h-4 w-4 border-t-2 border-indigo-500 border-r-2 rounded-full animate-spin"></div>
            </div>
          )}
        </div>

        {showDropdown && (
          <div
            ref={dropdownRef}
            className="absolute z-10 mt-1 w-full bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden transition-all duration-200 ease-in-out"
          >
            <SearchResults
              results={results}
              searchQuery={searchQuery}
              onSelectStudent={handleSelectStudent}
            />
          </div>
        )}
      </div>

      {selectedStudent ? (
        <div className="animate-fadeIn">
          <StudentCard
            student={selectedStudent}
            onClear={handleClearSelection}
          />
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-10 text-gray-500">
          <User className="h-16 w-16 mb-4 text-gray-300" />
          <p className="text-lg">Search and select a student to view details</p>
          <p className="text-sm mt-2">
            Type at least 3 characters to start searching
          </p>
        </div>
      )}
    </div>
  );
};

export default StudentSearch;

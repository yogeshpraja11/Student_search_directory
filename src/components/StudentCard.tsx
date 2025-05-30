import React from 'react';
import { X, BookOpen, Car as IdCard, User as UserIcon } from 'lucide-react';
import { Student } from '../types';

interface StudentCardProps {
  student: Student;
  onClear: () => void;
}

const StudentCard: React.FC<StudentCardProps> = ({ student, onClear }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
      <div className="bg-indigo-600 px-6 py-4 flex justify-between items-center">
        <h2 className="text-xl font-bold text-white">Student Details</h2>
        <button 
          onClick={onClear}
          className="text-white hover:bg-indigo-700 rounded-full p-1 transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-white"
          aria-label="Close"
        >
          <X className="h-5 w-5" />
        </button>
      </div>
      
      <div className="p-6">
        <div className="flex flex-col sm:flex-row items-start gap-6">
          <div className="bg-indigo-100 rounded-full p-6 flex items-center justify-center">
            <UserIcon className="h-16 w-16 text-indigo-600" />
          </div>
          
          <div className="flex-1">
            <div className="mb-4">
              <div className="flex items-center mb-1 text-gray-500">
                <UserIcon className="h-4 w-4 mr-2" />
                <span className="text-sm">Name</span>
              </div>
              <h3 className="text-xl font-bold text-gray-800">{student.name}</h3>
            </div>
            
            <div className="mb-4">
              <div className="flex items-center mb-1 text-gray-500">
                <BookOpen className="h-4 w-4 mr-2" />
                <span className="text-sm">Class</span>
              </div>
              <p className="text-lg font-medium text-gray-700">{student.class}</p>
            </div>
            
            <div>
              <div className="flex items-center mb-1 text-gray-500">
                <IdCard className="h-4 w-4 mr-2" />
                <span className="text-sm">Roll Number</span>
              </div>
              <p className="text-lg font-medium text-gray-700">{student.rollNumber}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentCard;
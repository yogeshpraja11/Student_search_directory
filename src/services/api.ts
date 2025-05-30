import axios from 'axios';
import { Student } from '../types';

const API_BASE_URL = 'http://localhost:5000/api';

interface SearchResponse {
  students: Student[];
}

interface StudentResponse {
  student: Student;
}

export const searchStudents = async (query: string): Promise<SearchResponse> => {
  try {
    const response = await axios.get<SearchResponse>(`${API_BASE_URL}/students/search`, {
      params: { query }
    });
    return response.data;
  } catch (error) {
    console.error('Error searching students:', error);
    return { students: [] };
  }
};

export const getStudentByRollNumber = async (rollNumber: number): Promise<Student | null> => {
  try {
    const response = await axios.get<StudentResponse>(`${API_BASE_URL}/students/${rollNumber}`);
    return response.data.student;
  } catch (error) {
    console.error('Error fetching student details:', error);
    return null;
  }
};
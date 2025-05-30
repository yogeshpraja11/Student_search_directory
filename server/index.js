import express from 'express';
import cors from 'cors';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Get the directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Load student data
const loadStudents = () => {
  try {
    const data = readFileSync(join(__dirname, 'data', 'students.json'), 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error loading student data:', error);
    return [];
  }
};

const students = loadStudents();

// Search API endpoint
app.get('/api/students/search', (req, res) => {
  const { query } = req.query;
  
  if (!query || query.length < 3) {
    return res.json({ students: [] });
  }

  const lowerCaseQuery = query.toLowerCase();
  
  // Filter students that match the query (case insensitive)
  const matchingStudents = students
    .filter(student => 
      student.name.toLowerCase().includes(lowerCaseQuery)
    )
    .slice(0, 5); // Limit to 5 results
  
  res.json({ students: matchingStudents });
});

// Get student by roll number
app.get('/api/students/:rollNumber', (req, res) => {
  const { rollNumber } = req.params;
  const student = students.find(s => s.rollNumber === parseInt(rollNumber));
  
  if (!student) {
    return res.status(404).json({ message: 'Student not found' });
  }
  
  res.json({ student });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
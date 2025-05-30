import express from "express";
import serverless from "serverless-http";
import cors from "cors";
import {readFileSync} from "fs";
import {join} from "path";

const app = express();
app.use(cors());
app.use(express.json());

// Load student dataconst students = JSON.parse(
const students = JSON.parse(
  readFileSync(join(__dirname, "data/students.json"), "utf8")
);

app.get("/api/students/search", (req, res) => {
  const {query} = req.query;

  if (!query || query.length < 3) {
    return res.json({students: []});
  }

  const lowerCaseQuery = query.toLowerCase();
  const matchingStudents = students
    .filter((student) => student.name.toLowerCase().includes(lowerCaseQuery))
    .slice(0, 5);

  res.json({students: matchingStudents});
});

app.get("/api/students/:rollNumber", (req, res) => {
  const {rollNumber} = req.params;
  const student = students.find((s) => s.rollNumber === parseInt(rollNumber));

  if (!student) {
    return res.status(404).json({message: "Student not found"});
  }

  res.json({student});
});

export const handler = serverless(app);

import React from "react";
import {GraduationCap} from "lucide-react";
import StudentSearch from "./components/StudentSearch";

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-blue-50 flex flex-col items-center p-4">
      <header className="w-full max-w-4xl mb-8 flex flex-col items-center pt-8">
        <div className="flex items-center mb-2">
          <GraduationCap className="h-10 w-10 text-indigo-600 mr-2" />
          <h1 className="text-3xl font-bold text-indigo-800">
            Student Directory
          </h1>
        </div>
        <p className="text-gray-600 text-center">
          Search for students by name to view their details
        </p>
      </header>

      <main className="w-full max-w-4xl flex-1 flex flex-col items-center">
        <StudentSearch />
      </main>
    </div>
  );
}

export default App;

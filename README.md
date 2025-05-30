# Student Search Application

A modern, responsive web application for searching student records with real-time results and a RESTful API backend. Built with React, TypeScript, and Express.js.

## Features

- **Real-time Search**: Search through student records as you type
- **Lazy Loading**: Search activates after 3 characters for optimal performance
- **Responsive Design**: Seamless experience across all device sizes
- **RESTful API**: Backend API serving student data from JSON
- **Modern UI**: Clean interface with smooth animations
- **Performance Optimized**: Debounced search with limited results

## Tech Stack

- **Frontend**:

  - React 18
  - TypeScript
  - Tailwind CSS
  - Lucide React (icons)
  - Axios

- **Backend**:
  - Express.js
  - Node.js
  - Local JSON data store

## Getting Started

1. **Clone the repository**

```bash
git clone <repository-url>
cd student-search-application
```

2. **Install dependencies**

```bash
npm install
```

3. **Start the development servers**

```bash
npm run dev:full
```

This will start both the frontend and backend servers:

- Frontend: [http://localhost:5173](http://localhost:5173)
- Backend API: [http://localhost:5000](http://localhost:5000)

## API Endpoints

### Search Students

```
GET /api/students/search?query=<search-term>
```

Returns up to 5 matching students based on the search term.

### Get Student by Roll Number

```
GET /api/students/:rollNumber
```

Returns detailed information for a specific student.

## Project Structure

```
├── server/
│   ├── data/
│   │   └── students.json    # Student data store
│   └── index.js            # Express server setup
├── src/
│   ├── components/         # React components
│   ├── hooks/             # Custom React hooks
│   ├── services/          # API service layer
│   ├── types/             # TypeScript definitions
│   └── App.tsx            # Root component
└── package.json
```

## Features in Detail

1. **Search Functionality**

   - Activates after 3 characters
   - Case-insensitive matching
   - Highlights matching text
   - Displays up to 5 results
   - Debounced input handling

2. **Student Details Display**
   - Name
   - Class
   - Roll Number
   - Clean card layout
   - Smooth transitions

## Performance Considerations

- Debounced search to prevent excessive API calls
- Lazy loading implementation
- Limited result set for faster rendering
- Optimized component re-renders

## License

MIT License - feel free to use this project for your own purposes.

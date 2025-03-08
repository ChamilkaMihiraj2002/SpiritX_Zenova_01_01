# SecureConnect Authentication System

A full-stack authentication system built with React, Node.js, Express, and MongoDB.

## Prerequisites

- Node.js (v16 or higher)
- MongoDB Atlas account
- NPM or Yarn package manager

## Project Structure

```
├── Backend/             # Backend server
│   ├── controllers/     # Request handlers
│   ├── middleware/     # Custom middleware
│   ├── model/         # Database models
│   ├── routes/        # API routes
│   └── index.js       # Server entry point
├── frontend/           # React frontend
    ├── src/           # Source files
    ├── public/        # Public assets
    └── index.html     # HTML entry point
```

## Getting Started

### Backend Setup

1. Navigate to the backend directory:
```bash
cd Backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the Backend directory with the following variables:
```
PORT=3000
MONGODB_URI=mongodb_connection_string
ACCESS_TOKEN_SECRET=your_secret_key
REFRESH_TOKEN_SECRET=your_refresh_secret_key
```

4. Start the backend server:
```bash
npm run dev
```

The server will start on http://localhost:3000

### Frontend Setup

1. Open a new terminal and navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The frontend will start on http://localhost:5173

## Features

- User registration with validation
- Secure login with JWT authentication
- Password strength indicator
- Protected routes
- MongoDB database integration
- Input validation and error handling

## API Endpoints

- `POST /api/users/login` - User login
- `POST /api/users` - Register new user
- `GET /api/users` - Get all users (protected)
- `GET /api/users/:username` - Check username availability
- `PUT /api/users/:username` - Update user (protected)
- `DELETE /api/users/:username` - Delete user (protected)

## Tech Stack

- **Frontend**: React, Vite, TailwindCSS
- **Backend**: Node.js, Express
- **Database**: MongoDB
- **Authentication**: JWT
- **Password Hashing**: bcrypt

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
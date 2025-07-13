import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import {connectDB} from './db/connectDB.js';
// Importing the connectDB function to establish a database connection

import authRoutes from './routes/auth.route.js'; // Importing the authRoutes to handle authentication routes
import taskRoutes from './routes/task.route.js'; // Importing the taskRoutes to handle task-related routes


dotenv.config(); // Load environment variables from .env file
const app = express();
const PORT = process.env.PORT || 5000;
// Initialize the Express application

app.use(cors({ origin: "http://localhost:5173", credentials: true })); // Enable CORS for all routes

app.use(express.json()); // Middleware to parse JSON request bodies
app.use(cookieParser()); // Middleware to parse cookies from request headers


app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes); // Registering the task routes under the /api/tasks endpoint


app.listen(5000, () => {
    connectDB();
  console.log('Server is running on http://localhost:5000');
});
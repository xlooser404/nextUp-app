import express from 'express';
import dotenv from 'dotenv';
import {connectDB} from './db/connectDB.js';
// Importing the connectDB function to establish a database connection

import authRoutes from './routes/auth.route.js'; // Importing the authRoutes to handle authentication routes


dotenv.config(); // Load environment variables from .env file
const app = express();
const PORT = process.env.PORT || 5000;
// Initialize the Express application

app.use(express.json()); // Middleware to parse JSON request bodies


app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.use("/api/auth", authRoutes);


app.listen(5000, () => {
    connectDB();
  console.log('Server is running on http://localhost:5000');
});
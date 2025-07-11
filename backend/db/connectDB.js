import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    console.log('mongo_uri:', process.env.MONGODB_URI); // Match .env variable name
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.error('MongoDB connection failed:', error.message);
    process.exit(1);
  }
};
import { create } from 'zustand';
import axios from 'axios';
// --- THE FIX IS HERE ---
// You must import the 'toast' function to use it in this file.
import { toast } from 'react-hot-toast';

// Use the same pre-configured axios instance as your taskStore
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  withCredentials: true,
});

export const useAuthStore = create((set) => ({
  // --- STATE ---
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,

  // --- ACTIONS ---

  // LOGIN ACTION
  login: async (email, password) => {
    set({ isLoading: true, error: null });
    try {
      const response = await api.post('/auth/login', { email, password });
      set({
        user: response.data.user,
        isAuthenticated: true,
        isLoading: false,
      });
      // This line will now work correctly because toast is imported.
      toast.success('Login successful! Welcome back.');
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Login failed. Please check your credentials.';
      set({ error: errorMessage, isLoading: false });
      // This line will also now work correctly.
      toast.error(errorMessage);
    }
  },

  // SIGNUP ACTION
  signup: async (name, email, password) => {
    set({ isLoading: true, error: null });
    try {
      const response = await api.post('/auth/signup', { name, email, password });
      set({
          user: response.data.user,
          isAuthenticated: true,
          isLoading: false
      });
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Signup failed.';
      set({ error: errorMessage, isLoading: false });
      toast.error(errorMessage);
    }
  },

  // LOGOUT ACTION
  logout: async () => {
    set({ isLoading: true });
    try {
      await api.post('/auth/logout');
      set({
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
      });
      toast.success('You have been logged out.');
    } catch (error) {
      set({
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: 'Logout failed, but you have been logged out on this device.',
      });
      console.error("Logout failed on server:", error);
    }
  },

  // CHECK AUTH ACTION
  checkAuth: async () => {
    try {
      const response = await api.get('/auth/check-auth');
      set({ user: response.data.user, isAuthenticated: true });
    } catch (error) {
      set({ user: null, isAuthenticated: false });
    }
  },
  
  // VERIFY EMAIL ACTION
  verifyEmail: async (verificationCode) => {
    set({ isLoading: true, error: null });
    try {
        const response = await api.post('/auth/verify-email', { code: verificationCode });
        set({
            user: response.data.user, // The backend should return the updated user object
            isAuthenticated: true,
            isLoading: false,
        });
        return true; // Indicate success
    } catch (error) {
        const errorMessage = error.response?.data?.message || 'Verification failed.';
        set({ error: errorMessage, isLoading: false });
        toast.error(errorMessage);
        return false; // Indicate failure
    }
  }
}));
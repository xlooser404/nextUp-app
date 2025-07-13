import { create } from 'zustand';
import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  withCredentials: true,
});

/**
 * Zustand store for managing task state and actions.
 */
export const useTaskStore = create((set) => ({
  // --- STATE ---
  tasks: [],
  isLoading: false,
  error: null,


  fetchTasks: async (filters = {}) => {
    set({ isLoading: true, error: null });
    try {

      const response = await api.get('/tasks', { params: filters });
      set({ tasks: response.data, isLoading: false });
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to fetch tasks.';
      set({ error: errorMessage, isLoading: false });
    }
  },


  addTask: async (taskData) => {
    try {
      const response = await api.post('/tasks', taskData);
      set((state) => ({
        tasks: [response.data, ...state.tasks],
      }));
    } catch (error) {
      // Optionally, set an error state to show in a toast notification
      console.error("Failed to add task:", error);
    }
  },

  updateTask: async (id, updateData) => {
    try {
      const response = await api.put(`/tasks/${id}`, updateData);

      set((state) => ({
        tasks: state.tasks.map((task) =>
          task._id === id ? response.data : task
        ),
      }));
    } catch (error) {
      console.error("Failed to update task:", error);
    }
  },

  deleteTask: async (id) => {
    try {
      await api.delete(`/tasks/${id}`);
      // Remove the task from the local state for an immediate UI update.
      set((state) => ({
        tasks: state.tasks.filter((task) => task._id !== id),
      }));
    } catch (error) {
      console.error("Failed to delete task:", error);
    }
  },
}));
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Filter, Loader, AlertTriangle, Edit2, Trash2 } from 'lucide-react';
import { useTaskStore } from '../store/taskStore';

// --- Main HomePage Component ---
const HomePage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(null);
  const [filters, setFilters] = useState({
    status: '',
    priority: '',
    sortBy: 'createdAt_desc',
  });
  const { tasks, fetchTasks, isLoading, error } = useTaskStore();

  useEffect(() => {
    fetchTasks(filters);
  }, [fetchTasks, filters]);

  const handleAddTask = () => {
    setTaskToEdit(null);
    setIsModalOpen(true);
  };

  const handleEditTask = (task) => {
    setTaskToEdit(task);
    setIsModalOpen(true);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto p-4 md:p-8 w-full"
    >
      {/* Page Header */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-white mb-4 md:mb-0">Your Tasks</h1>
        <motion.button
          onClick={handleAddTask}
          className="flex items-center bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-5 rounded-lg transition duration-200 shadow-lg"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Plus className="mr-2" size={20} />
          Add New Task
        </motion.button>
      </div>

      {/* Filters and Sorting Section */}
      <div className="flex flex-col md:flex-row gap-4 mb-8 p-4 bg-white rounded-lg shadow-md">
        <FilterControls filters={filters} onFilterChange={handleFilterChange} />
      </div>

      {/* Task List Section */}
      <div className="w-full">
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <Loader className="w-12 h-12 animate-spin text-green-500" />
          </div>
        ) : error ? (
           <div className="text-center text-red-600 p-8 bg-red-100 rounded-lg">
            <p className="font-medium">Error: {error}</p>
          </div>
        ) : tasks.length > 0 ? (
          <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence>
              {tasks.map(task => (
                <TaskItem key={task._id} task={task} onEdit={handleEditTask} />
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          <EmptyState onAddTask={handleAddTask} />
        )}
      </div>

      {/* Modal for Creating/Editing Tasks */}
      <AnimatePresence>
        {isModalOpen && (
          <TaskModal
            task={taskToEdit}
            onClose={() => setIsModalOpen(false)}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
};

// --- Sub-component for Filter Controls (Themed) ---
const FilterControls = ({ filters, onFilterChange }) => (
  <>
    <div className="flex-1">
      <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">Filter by Status</label>
      <select name="status" value={filters.status} onChange={onFilterChange} className="w-full bg-gray-100 text-gray-800 rounded-md p-2 border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500">
        <option value="">All</option>
        <option value="Not Started">Not Started</option>
        <option value="In Progress">In Progress</option>
        <option value="Completed">Completed</option>
      </select>
    </div>
    <div className="flex-1">
      <label htmlFor="priority" className="block text-sm font-medium text-gray-700 mb-1">Filter by Priority</label>
      <select name="priority" value={filters.priority} onChange={onFilterChange} className="w-full bg-gray-100 text-gray-800 rounded-md p-2 border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500">
        <option value="">All</option>
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
      </select>
    </div>
    <div className="flex-1">
      <label htmlFor="sortBy" className="block text-sm font-medium text-gray-700 mb-1">Sort By</label>
      <select name="sortBy" value={filters.sortBy} onChange={onFilterChange} className="w-full bg-gray-100 text-gray-800 rounded-md p-2 border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500">
        <option value="createdAt_desc">Newest First</option>
        <option value="createdAt_asc">Oldest First</option>
        <option value="priority_desc">Priority (High to Low)</option>
        <option value="priority_asc">Priority (Low to High)</option>
      </select>
    </div>
  </>
);


// --- Sub-component for a single Task Item (Themed) ---
const TaskItem = ({ task, onEdit }) => {
  const { deleteTask } = useTaskStore();

  // New, softer color scheme for priority badges on a light background
  const priorityStyles = {
    Low: 'bg-blue-100 text-blue-800',
    Medium: 'bg-yellow-100 text-yellow-800',
    High: 'bg-red-100 text-red-800',
  };

  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete "${task.title}"?`)) {
      deleteTask(task._id);
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 50, scale: 0.8 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
      transition={{ duration: 0.4, type: 'spring' }}
      className="bg-white rounded-xl p-6 flex flex-col justify-between shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all"
    >
      <div>
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-bold text-gray-900 pr-2">{task.title}</h3>
          <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${priorityStyles[task.priority]}`}>{task.priority}</span>
        </div>
        <p className="text-gray-600 mb-4 h-12 overflow-hidden">{task.description || 'No description provided.'}</p>
        <p className="text-sm text-gray-500">Status: <span className="font-semibold text-gray-700">{task.status}</span></p>
      </div>
      <div className="flex justify-end gap-3 mt-6 border-t pt-4 border-gray-100">
        <button onClick={() => onEdit(task)} className="text-sm font-medium text-indigo-600 hover:text-indigo-800 flex items-center gap-1"><Edit2 size={14}/> Edit</button>
        <button onClick={handleDelete} className="text-sm font-medium text-red-600 hover:text-red-800 flex items-center gap-1"><Trash2 size={14}/> Delete</button>
      </div>
    </motion.div>
  );
};


// --- Sub-component for the Create/Edit Modal (Themed) ---
const TaskModal = ({ task, onClose }) => {
  const { addTask, updateTask } = useTaskStore();
  const [formData, setFormData] = useState({
    title: task?.title || '',
    description: task?.description || '',
    status: task?.status || 'Not Started',
    priority: task?.priority || 'Medium',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title) return alert("Title is required.");
    if (task) {
      updateTask(task._id, formData);
    } else {
      addTask(formData);
    }
    onClose();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex justify-center items-center z-50 p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 50, opacity: 0 }}
        className="bg-white rounded-lg p-8 w-full max-w-lg shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-2xl font-bold text-gray-900 mb-6">{task ? 'Edit Task' : 'Create New Task'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="title" className="block text-gray-700 font-medium mb-2">Title</label>
            <input type="text" name="title" value={formData.title} onChange={handleChange} className="w-full bg-gray-100 p-3 rounded text-gray-800 border border-gray-300 focus:ring-2 focus:ring-green-500" required />
          </div>
           <div className="mb-4">
            <label htmlFor="description" className="block text-gray-700 font-medium mb-2">Description</label>
            <textarea name="description" value={formData.description} onChange={handleChange} className="w-full bg-gray-100 p-3 rounded text-gray-800 border border-gray-300 focus:ring-2 focus:ring-green-500" rows="3"></textarea>
          </div>
          <div className="flex gap-4 mb-6">
            <div className="w-1/2">
               <label htmlFor="status" className="block text-gray-700 font-medium mb-2">Status</label>
               <select name="status" value={formData.status} onChange={handleChange} className="w-full bg-gray-100 p-3 rounded text-gray-800 border border-gray-300 focus:ring-2 focus:ring-green-500">
                 <option>Not Started</option>
                 <option>In Progress</option>
                 <option>Completed</option>
               </select>
            </div>
            <div className="w-1/2">
                <label htmlFor="priority" className="block text-gray-700 font-medium mb-2">Priority</label>
               <select name="priority" value={formData.priority} onChange={handleChange} className="w-full bg-gray-100 p-3 rounded text-gray-800 border border-gray-300 focus:ring-2 focus:ring-green-500">
                 <option>Low</option>
                 <option>Medium</option>
                 <option>High</option>
               </select>
            </div>
          </div>
          <div className="flex justify-end gap-4">
            <button type="button" onClick={onClose} className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold px-4 py-2 rounded-lg">Cancel</button>
            <button type="submit" className="bg-green-600 hover:bg-green-700 text-white font-bold px-4 py-2 rounded-lg">{task ? 'Save Changes' : 'Create Task'}</button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};


// --- Sub-component for when there are no tasks (Themed) ---
const EmptyState = ({ onAddTask }) => (
    <div className="text-center py-20 px-8 bg-white/70 backdrop-blur-sm rounded-lg shadow-md">
        <AlertTriangle className="mx-auto h-12 w-12 text-gray-400" />
        <h3 className="mt-4 text-xl font-semibold text-gray-900">No tasks yet</h3>
        <p className="mt-2 text-gray-600">Get started by creating your first task.</p>
        <div className="mt-6">
            <button
                onClick={onAddTask}
                type="button"
                className="inline-flex items-center px-4 py-2 font-bold rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
                <Plus className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
                New Task
            </button>
        </div>
    </div>
);


export default HomePage;
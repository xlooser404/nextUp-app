import Task from '../models/task.model.js';
import mongoose from 'mongoose';


export const getTasks = async (req, res) => {
    try {
        const { status, priority, sortBy } = req.query;

        // Base query ALWAYS filters by the logged-in user's ID for security
        const query = { userId: req.userId };

        // Add filters to the query if they are provided
        if (status) query.status = status;
        if (priority) query.priority = priority;

        // Define sorting logic based on the sortBy parameter
        let sortOptions = {};
        switch (sortBy) {
            case 'createdAt_desc':
                sortOptions = { createdAt: -1 };
                break;
            case 'createdAt_asc':
                sortOptions = { createdAt: 1 };
                break;
            case 'priority_desc':
                sortOptions = { priority: -1, createdAt: -1 }; // Sort by priority, then by date
                break;
            case 'priority_asc':
                sortOptions = { priority: 1, createdAt: -1 };
                break;
            default:
                sortOptions = { createdAt: -1 }; // Default sort: newest first
        }
        
        const tasks = await Task.find(query).sort(sortOptions);
        
        res.status(200).json(tasks);
    } catch (error) {
        console.error('Error fetching tasks:', error);
        res.status(500).json({ message: 'Server error while fetching tasks.' });
    }
};


export const createTask = async (req, res) => {
    const { title, description, status, priority } = req.body;

    // Basic input validation
    if (!title) {
        return res.status(400).json({ message: 'Title is required.' });
    }

    try {
        const task = new Task({
            title,
            description,
            status,
            priority,
            userId: req.userId, // Associate the task with the logged-in user
        });

        const createdTask = await task.save();
        res.status(201).json(createdTask);
    } catch (error) {
        console.error('Error creating task:', error);
        res.status(500).json({ message: 'Server error while creating task.' });
    }
};


export const updateTask = async (req, res) => {
    const { id } = req.params;
    const { title, description, status, priority } = req.body;

    // Check for a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: 'Invalid task ID.' });
    }

    try {
        const task = await Task.findById(id);

        if (!task) {
            return res.status(404).json({ message: 'Task not found.' });
        }

        // CRITICAL: Ensure the user owns the task they are trying to update
        if (task.userId.toString() !== req.userId) {
            return res.status(403).json({ message: 'User not authorized to update this task.' });
        }
        
        // Update fields
        task.title = title || task.title;
        task.description = description || task.description;
        task.status = status || task.status;
        task.priority = priority || task.priority;

        const updatedTask = await task.save();
        res.status(200).json(updatedTask);

    } catch (error) {
        console.error('Error updating task:', error);
        res.status(500).json({ message: 'Server error while updating task.' });
    }
};


export const deleteTask = async (req, res) => {
    const { id } = req.params;

    // Check for a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: 'Invalid task ID.' });
    }

    try {
        const task = await Task.findById(id);

        if (!task) {
            return res.status(404).json({ message: 'Task not found.' });
        }

        // CRITICAL: Ensure the user owns the task they are trying to delete
        if (task.userId.toString() !== req.userId) {
            return res.status(403).json({ message: 'User not authorized to delete this task.' });
        }

        await task.deleteOne(); // Use deleteOne() on the document instance

        res.status(200).json({ message: 'Task deleted successfully.' });
    } catch (error) {
        console.error('Error deleting task:', error);
        res.status(500).json({ message: 'Server error while deleting task.' });
    }
};
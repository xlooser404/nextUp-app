import express from 'express';
import {
    getTasks,
    createTask,
    updateTask,
    deleteTask
} from '../controllers/task.controller.js';
import { verifyToken } from '../middleware/verifyToken.js'; // You already have this middleware for auth

const router = express.Router();

router.use(verifyToken);

router.get('/', getTasks);


router.post('/', createTask);


router.put('/:id', updateTask);


router.delete('/:id', deleteTask);

export default router;
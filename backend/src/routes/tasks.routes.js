import { Router } from 'express';

import { authRequired } from '../middlewares/validateToken.js';
import {
    createTask,
    getTasks,
    getTaskById,
    updateTask,
    deleteTask
} from '../controllers/tasks.controller.js'
import { validateSchema } from '../middlewares/validator.middleware.js';
import { 
    createTaskSchema, 
    updateTaskSchema, 
} from '../schemas/task.schema.js';

const router = Router();

router.post('/tasks', authRequired, validateSchema(createTaskSchema), createTask);
router.get('/tasks', authRequired, getTasks);
router.get('/tasks/:id', authRequired, getTaskById);
router.put('/tasks/:id', authRequired, validateSchema(updateTaskSchema), updateTask);
router.delete('/tasks/:id', authRequired, deleteTask);

export default router;

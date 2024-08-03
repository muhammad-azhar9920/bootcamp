import express from 'express';
import {getAllTasks,AddTask,getSingleTask,editTask,deleteTask,updatePendingTask} from '../controllers/tasks.js';

const router = express.Router();

// GET ALL TASKS OF SPECIFIC USER BY user id
router.get('/alltasks/:id',getAllTasks)

// GET SINGLE TASK BY task id
router.get('/singletask/:id',getSingleTask)

// POST ADD TASK
router.post('/addtask',AddTask)

// PUT UPDATE TASK
router.put('/edittask',editTask)

// DELETE TASK
router.delete('/deletetask/:id',deleteTask)

// PUT update (pending task into completed task) by id
router.put('/updatependingtask/:id',updatePendingTask)

export default router;
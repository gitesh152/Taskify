import Express from "express";
const router = Express.Router()
import { createTask, accessTask, updateTaskInfo, deleteTask, toggleComplete, statusUpdation } from '../controllers/taskController.js'

import authenticate from "../middlewares/authMiddleware.js";        //middleware to authenticate user

router.route('/').post(authenticate, createTask);       //create a new task
router.route('/').get(authenticate, accessTask);        //access all task related to a user
router.route('/').put(authenticate, updateTaskInfo);    //update task title, description, attachament, assignee (by admin)
router.route('/').delete(authenticate, deleteTask);     //delete task (by admin)

router.route('/toggle-complete').put(authenticate, toggleComplete); //toggle complete-assigned (by admin)
router.route('/status-update').put(authenticate, statusUpdation);   //update task status (by task related users)         

export default router;
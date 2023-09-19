import asyncHandler from "express-async-handler";
import Task from "../models/taskModel.js";
import { newTaskAssignEmail, adminTaskUpdateEmail, taskStatusUpdateEmail } from "../config/nodemailer.js";

const createTask = asyncHandler(async (req, res) => {
    try {
        const { title, description, assignee } = req.body;

        var taskData = {
            title,
            description,
            admin: req.user._id,
            assignee
        }

        const newTask = await Task.create(taskData);
        const FullTask = await newTask.populate({ path: 'admin assignee', select: '-password' })
        res.status(201)
        res.send(FullTask);
        newTaskAssignEmail(FullTask);       //new task email notification
    }
    catch (e) {
        res.json({
            //Since error constructor return enumerable properties
            message: e.message,
            stack: e.stack,
        });
    }
})

const accessTask = asyncHandler(async (req, res) => {
    try {
        const keyword = {
            $or: [
                { admin: req.user._id },
                { assignee: req.user._id },
            ]
        }

        const userAllTasks = await Task.find(keyword)
            .populate({ path: 'admin assignee', select: '-password' })
            .sort({ updatedAt: -1 });
        res.status(201).send(userAllTasks)

    }
    catch (error) {
        res.json({
            message: error.message,
            stack: error.stack
        })
    }
})

const updateTaskInfo = asyncHandler(async (req, res) => {
    try {
        const task = await Task.findById(req.body.taskId);
        if (task) {
            task.title = req.body.title || task.title
            task.description = req.body.description || task.description
            task.attachment = req.body.attachment || task.attachment
            task.assignee = req.body.assignee || task.assignee
            const updatedTask = await task.save();
            const FullTask = await updatedTask.populate({ path: 'admin assignee', select: '-password' })
            res.status(201).json(FullTask);
            if (req.body.assignee && req.body.assignee !== task.assignee.id) {
                newTaskAssignEmail(FullTask);       //new task email notification if task is reassigned to someone new
            }
            else
                adminTaskUpdateEmail(FullTask);     //task information update email notification
        }
        else {
            res.status(401);
            throw new Error('Task not found ... ');
        }

    }
    catch (error) {
        res.json({
            message: error.message,
            stack: error.stack
        })
    }
})

const deleteTask = asyncHandler(async (req, res) => {
    try {
        //since axios delete does not support req.body data, we get req.data in headers
        const task = await Task.findByIdAndDelete(req.headers.taskid);
        if (task) {
            res.status(201).json(task);
        }
        else {
            res.status(401);
            throw new Error('Task not found ... ');
        }
    }
    catch (error) {
        res.json({
            message: error.message,
            stack: error.stack
        })
    }
})

const toggleComplete = asyncHandler(async (req, res) => {
    try {
        const task = await Task.findById(req.body.taskId);
        if (task) {
            task.status = req.body.completed === true ? 'Completed' : 'Assigned'
            task.completed = req.body.completed
            const updatedTask = await task.save();
            const FullTask = await updatedTask.populate({ path: 'admin assignee', select: '-password' })
            res.status(201).json(FullTask);
            taskStatusUpdateEmail(task.title, FullTask.admin, FullTask.assignee, task.status) //task status update notification
        }
        else {
            res.status(401);
            throw new Error('Task not found ... ');
        }
    }
    catch (error) {
        res.json({
            message: error.message,
            stack: error.stack
        })
    }
})

const statusUpdation = asyncHandler(async (req, res) => {
    try {
        const task = await Task.findById(req.body.taskId);
        if (task) {
            task.status = req.body.status || task.status
            task.completed = req.body.status === 'Completed' ? true : false
            const updatedTask = await task.save();
            const FullTask = await updatedTask.populate({ path: 'admin assignee', select: '-password' })
            res.status(201).json(FullTask);
            taskStatusUpdateEmail(                 //task status update notification
                task.title,
                req.user.id === task.admin.id ? FullTask.admin : FullTask.assignee, //logic to define email sender
                req.user.id === task.admin.id ? FullTask.assignee : FullTask.admin, //logic to define email receiver
                task.status
            )

        }
        else {
            res.status(401);
            throw new Error('Task not found ... ');
        }
    }
    catch (error) {
        res.json({
            message: error.message,
            stack: error.stack
        })
    }
})


export { createTask, accessTask, updateTaskInfo, deleteTask, toggleComplete, statusUpdation }
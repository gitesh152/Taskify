import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    status: { type: String, default: "Assigned" },
    completed: { type: Boolean, default: false },
    attachment: { type: String },
    admin: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    assignee: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true })

const Task = mongoose.model('Task', taskSchema);

export default Task;
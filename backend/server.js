import 'dotenv/config'
import Express from 'express';
const app = Express();

import connectDB from './config/mongoose.js'
connectDB() //connect to database

import cors from 'cors';
app.use(cors())             //using cors for cross origin requests
app.use(Express.json())     //telling server to accept json data from frontend

import userRoutes from './routes/userRoutes.js'
app.use('/api/users', userRoutes)
import taskRoute from './routes/taskRoute.js'
app.use('/api/tasks', taskRoute)

// app.get("/", (req, res) =>
//     res.send("API is running..")
// );


// --------------------------deployment------------------------------
import path from 'path';
const __dirname1 = path.resolve();
if (process.env.NODE_ENV === "production") {
    app.use(Express.static(path.join(__dirname1, "../frontend/build")));
    app.get("*", (req, res) =>
        res.sendFile(path.resolve(__dirname1, "..", "frontend", "build", "index.html"))
    );
}
else {
    app.get("/", (req, res) =>
        res.send("API is running..")
    );
}
// --------------------------deployment------------------------------


import { notFound, errorHandler } from './middlewares/errorMiddleware.js'
//middlewares
app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => console.log(`Server started listening on port ${PORT}`))

import { Server } from "socket.io";

const io = new Server(server, {
    pingTimeout: 60000,
    cors: {
        origin: 'http://localhost:3000'
    }
})

io.on('connection', (socket) => {
    console.log('A user connected')

    socket.on('join room', (user) => {
        socket.join(user._id)
        console.log(`User ${user.name} joined room: ${user._id}`);
    })

    socket.on('taskNotification', (data) => {
        const receiver = data.user._id === data.task.admin._id ? data.task.assignee : data.task.admin
        socket.in(receiver._id).emit('taskNotificationBroadcast', data);
    })

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
})
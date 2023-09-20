import React, { createContext, useContext, useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import io from 'socket.io-client'

// for production deployment, change these to production url domain

// const apiUrl = 'http://localhost:5000/api'
// const SOCKET_ENDPOINT = 'http://localhost:5000';

const apiUrl = 'https://taskify-72sn.onrender.com/api'
const SOCKET_ENDPOINT = 'https://taskify-72sn.onrender.com';

var socket;

const TaskContext = createContext();

const TaskProvider = ({ children }) => {
    const [user, setUser] = useState('')
    const [tasks, setTasks] = useState([])
    const [filterdTasks, setFilterdTasks] = useState([]);
    const [notification, setNotification] = useState([])
    const [toggleTaskFetch, settToggleTaskFetch] = useState(false)
    const Navigate = useNavigate()

    useEffect(() => {
        const userInfo = JSON.parse(localStorage.getItem('userInfo'))
        if (userInfo) {
            setUser(userInfo)
            socket = io(SOCKET_ENDPOINT);
            socket.emit('join room', userInfo)
        }
        else
            Navigate('/')
    }, [Navigate])

    return (
        <TaskContext.Provider value={{ apiUrl, toggleTaskFetch, settToggleTaskFetch, notification, setNotification, socket, user, tasks, setTasks, filterdTasks, setFilterdTasks }}>
            {children}
        </TaskContext.Provider>
    )
}

export const TaskState = () => useContext(TaskContext);

export default TaskProvider
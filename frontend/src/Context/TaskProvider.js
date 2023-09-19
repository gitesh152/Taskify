import React, { createContext, useContext, useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import io from 'socket.io-client'

var socket;

const ENDPINT = 'http://localhost:5000';
// for production deployment, change it to production url domain

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
            socket = io(ENDPINT);
            socket.emit('join room', userInfo)
        }
        else
            Navigate('/')
    }, [Navigate])

    return (
        <TaskContext.Provider value={{ toggleTaskFetch, settToggleTaskFetch, notification, setNotification, socket, user, tasks, setTasks, filterdTasks, setFilterdTasks }}>
            {children}
        </TaskContext.Provider>
    )
}

export const TaskState = () => useContext(TaskContext);

export default TaskProvider
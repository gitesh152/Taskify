import React from 'react'
import Header from '../Components/Miscellaneous/Header'
import TaskList from '../Components/Miscellaneous/TaskList'
import ScrollButton from '../Components/Miscellaneous/ScrollButton'

const TaskPage = () => {
    return (
        <div style={{ width: "100%" }}  >
            <Header />
            <TaskList />
            <ScrollButton />
        </div>
    )
}

export default TaskPage
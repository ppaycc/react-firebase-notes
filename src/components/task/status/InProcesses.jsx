import React from "react";
import Todo from "../Todo";

const InProcesses = ({task, makeGreatTask, deleteTask, toggleCompleted}) => {
    const inProcesses = Object.keys(task).length > 0 ? makeGreatTask(task).filter(item=> item.completed !== true) : [];
    return (
        inProcesses.length > 0 ? (
                inProcesses.map(item=>{
                    return <Todo
                        key={item.id}
                        deleteTask={deleteTask}
                        toggleCompleted={toggleCompleted}
                        {...item}
                    />
                })
            ) : (
                <span className="empty">You don't have notes</span>
            )
    )
}

export default InProcesses;
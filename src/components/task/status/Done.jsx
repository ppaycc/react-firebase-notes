import React from "react";
import Todo from "../Todo";

const Done = ({task, makeGreatTask, deleteTask, toggleCompleted}) => {
    const done = Object.keys(task).length > 0 ? makeGreatTask(task).filter(item=> item.completed === true) : [];
    return (
        done.length > 0 ? (
                done.map(item=>{
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

export default Done;
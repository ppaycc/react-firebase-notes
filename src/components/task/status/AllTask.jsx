import React from "react";
import Todo from "../Todo";

const AllTask = ({task, makeGreatTask, deleteTask, toggleCompleted}) => {
    return (
        Object.keys(task).length > 0 ? (
                makeGreatTask(task)
                    .map((item) => {
                        return (
                            <Todo
                                key={item.id}
                                deleteTask={deleteTask}
                                toggleCompleted={toggleCompleted}
                                {...item}
                            />
                        );
                    })
            ) : (
                <span className="empty">You don't have notes</span>
            )
    )
}

export default AllTask;
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router";
import fire from "../../fire";
import {
  deleteTaskThunk,
  initializationDataBase,
  setUserId,
} from "../../redux/userTodo";
import { useEffect, useState } from "react";
import Todo from "./Todo";
import Form from "./Form";

const Task = () => {
  const userId = useSelector((state) => state.data.userId);
  const userEmail = useSelector((state) => state.data.userEmail);
  const [showForm, setShowForm] = useState(false);
  const dispatch = useDispatch();
  const task = useSelector((state) => state.data.task);
  const handleLogout = () => {
    fire.auth().signOut();
    dispatch(setUserId(""));
  };
  useEffect(() => {
    if (userId) {
      dispatch(initializationDataBase(userId));
    }
  }, [userId, dispatch]);
  const makeGreatTask = (arr) => {
    const arrTasks = [];
    if (arr) {
      for (let i in arr) {
        const copy = { ...arr };
        arrTasks.push({ ...copy[i], id: i });
      }
    }
    return arrTasks;
  };

  const deleteTask = (id) => {
    dispatch(deleteTaskThunk(id, userId, task));
  };
  return userId ? (
    <section className="hero">
      <nav>
        <h2>{userEmail}</h2>
        <button onClick={handleLogout}>Logout</button>
      </nav>
      {showForm && <Form setShowForm={setShowForm} userId={userId} />}
      <div className="task">
        <div className="task-header">
          <h2 className="header">Tasks</h2>
          <button onClick={() => setShowForm(true)}>Add</button>
        </div>
        {Object.keys(task).length > 0 ? (
          makeGreatTask(task).map((item) => {
            return (
              <Todo
                key={item.id}
                header={item.header}
                deleteTask={deleteTask}
                id={item.id}
                body={item.title}
                timeAgo={item.timeAgo}
                timePost={item.timePost}
              />
            );
          })
        ) : (
          <span className="empty">You don't have notes</span>
        )}
      </div>
    </section>
  ) : (
    <Redirect to="/auth" />
  );
};

export default Task;

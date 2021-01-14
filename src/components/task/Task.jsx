import { useDispatch, useSelector } from "react-redux";
import {Redirect, Route, NavLink} from "react-router-dom";
import fire from "../../fire";
import {
  deleteTaskThunk,
  initializationDataBase,
  setUserId,
  toggleCompletedTask,
} from "../../redux/userTodo";
import { useEffect, useState } from "react";
import Form from "./Form";
import AllTask from "./status/AllTask";
import InProcesses from "./status/InProcesses";
import Done from "./status/Done";

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
    return arrTasks.reverse();
  };

  const deleteTask = (id) => {
    dispatch(deleteTaskThunk(id, userId));
  };
  const toggleCompleted = (id, completed) => {
    dispatch(toggleCompletedTask(id, completed, userId));
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
        <div className="status-nav">
          <NavLink to={'/task/all'}>All</NavLink>
          <NavLink to={'/task/in-processes'}>In processes</NavLink>
          <NavLink to={'/task/done'}>Done</NavLink>
        </div>
        <Route  path='/task/all' render={()=> <AllTask makeGreatTask={makeGreatTask}
                                                       deleteTask={deleteTask}
                                                       toggleCompleted={toggleCompleted}
                                                       task={task}/> } />
        <Route  path='/task/in-processes' render={()=> <InProcesses makeGreatTask={makeGreatTask}
                                                       deleteTask={deleteTask}
                                                       toggleCompleted={toggleCompleted}
                                                       task={task}/> } />
        <Route  path='/task/done' render={()=> <Done makeGreatTask={makeGreatTask}
                                                                    deleteTask={deleteTask}
                                                                    toggleCompleted={toggleCompleted}
                                                                    task={task}/> } />
      </div>
    </section>
  ) : (
    <Redirect to="/auth" />
  );
};

export default Task;

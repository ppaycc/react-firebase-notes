const Todo = ({
  header,
  title,
  timeAgo,
  timePost,
  deleteTask,
  id,
  toggleCompleted,
  completed,
}) => {
  const setTimeAgo = (date) => {
    const time = (Date.now() - date) / 1000;
    if (time / 60 <= 60) {
      return `${Math.floor(time / 60)} minutes ago`;
    } else if (time / 60 / 60 <= 24) {
      return `${Math.floor(time / 60 / 60)} hours ago`;
    } else if (time / 60 / 60 / 24 >= 1) {
      return `${Math.floor(time / 60 / 60 / 24)} days ago`;
    } else if (time / 60 / 60 / 24 / 30 >= 1){
      return `${Math.floor(time / 60 / 60 / 24 / 30)} month ago`;
    }
  };

  const setTimePost = (time) => {
    const d = new Date(time);
    let str = "" + d;
    return str.slice(4, 33) + ", ";
  };

  return (
    <div className="todo">
      <p className={completed ? "headerTodo done" : "headerTodo"}>
        {header}{" "}
        <span className="timeAgo">
          {setTimePost(timePost)} {setTimeAgo(timeAgo)}
        </span>
      </p>
      <p className="body">{title}</p>
      <div className="btn-group">
        <button className="btn-group-one" onClick={() => deleteTask(id)}>
          Delete
        </button>
        <button
          className="btn-group-two"
          onClick={() => toggleCompleted(id, completed)}
        >
          {completed ? 'Undone' : 'Done'}
        </button>
      </div>
    </div>
  );
};

export default Todo;

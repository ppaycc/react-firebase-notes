const Todo = ({ header, body, timeAgo, timePost, deleteTask, id }) => {
  const setTimeAgo = (date) => {
    const time = (Date.now() - date) / 1000;
    if (time / 60 <= 60) {
      console.log(time / 60 <= 60);
      return `${Math.floor(time / 60)} minutes ago`;
    } else if (time / 60 / 60 <= 24) {
      console.log(time / 60 / 60, time);
      return `${Math.floor(time / 60 / 60)} hours ago`;
    } else if (time / 60 / 60 / 24 >= 1) {
      return `${Math.floor(time / 60 / 60 / 24)} days ago`;
    }
  };

  const setTimePost = (time) => {
    const d = new Date(time);
    // console.log(d.getUTCHours);
    let str = "" + d;
    return str.slice(4, 34);
  };

  return (
    <div className="todo">
      <p className="headerTodo">
        {header}{" "}
        <span className="timeAgo">
          {setTimePost(timePost)} {setTimeAgo(timeAgo)}
        </span>
      </p>
      <p className="body">{body}</p>
      <button onClick={() => deleteTask(id)}>Delete task</button>
    </div>
  );
};

export default Todo;

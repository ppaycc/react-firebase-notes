import { useState } from "react";
import { useDispatch } from "react-redux";
import { addNewTask } from "../../redux/userTodo";

const Form = ({ setShowForm, userId }) => {
  const [header, setHeader] = useState("");
  const [title, setTitle] = useState("");
  const dispatch = useDispatch();

  const click = () => {
    if (header.trim().length > 0 && title.trim().length > 0) {
      dispatch(
        addNewTask(userId, {
          timeAgo: Date.now(),
          header,
          title,
          timePost: new Date().getTime(),
          completed: false,
        })
      );
      setShowForm(false);
    }
  };

  return (
    <div className="form">
      <div className="formWrapper">
        <div className="df">
          <p>New task</p>
          <button className="close" onClick={() => setShowForm(false)}>
            x
          </button>
        </div>
        <input
          type="text"
          placeholder="Header"
          value={header}
          onChange={(e) => setHeader(e.target.value)}
        />
        <textarea
          type="text"
          rows="3"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button onClick={() => click()}>Add</button>
      </div>
    </div>
  );
};

export default Form;

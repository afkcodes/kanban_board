import React from "react";
import "react-responsive-modal/styles.css";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";

function AddButton({ column, addTask }) {
  const [taskTitle, setTaskTitle] = React.useState("");
  const [taskDesc, setTaskDesc] = React.useState("");

  function handleClick() {
    addTask(column, taskTitle, taskDesc);
  }
  function handleChange(e, type) {
    if (type === "title") {
      setTaskTitle(e.target.value);
    } else {
      setTaskDesc(e.target.value);
    }
  }

  return (
    <Popup
      trigger={
        <button className="add_task_btn" onClick={handleClick}>
          +
        </button>
      }
      modal
    >
      {(close) => (
        <div className="task_info_popup">
          <input
            className="task_title_input"
            type="text"
            placeholder="Enter Task Title"
            onChange={(e) => {
              handleChange(e, "title");
            }}
            value={taskTitle}
          />
          <textarea
            className="task_desc_input"
            rows={5}
            cols={30}
            placeholder="Enter Task Description"
            onChange={(e) => {
              handleChange(e, "desc");
            }}
            value={taskDesc}
          />
          <button
            className="create_task_btn"
            onClick={() => {
              handleClick();
              close();
            }}
          >
            Create Task
          </button>
        </div>
      )}
    </Popup>
  );
}

export default AddButton;

import React from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import AddButton from "../AddButton/AddButton";
import "./column.css";

function Task({ task, index }) {

  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided) => {
        return (
          <div
            className="task_container"
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
          >
            <h3 className="task_title">{task.title}</h3>
            <hr className="horizontal_rule"/>
            <p align="left" className="task_desc">{task.content}</p>
          </div>
        );
      }}
    </Draggable>
  );
}

function Column({ tasks, column, addTask, updateColumTitle }) {
  const [colTitle, setColTitle] = React.useState("");
  function handleChange(e) {
    setColTitle(e.target.value);
    updateColumTitle(e.target.value, column.id);
  }

  return (
    <div className="task_column">
      <div className="column_options">
        <input
          className="column_title"
          type="text"
          onChange={handleChange}
          value={colTitle || column.title}
        />
        <AddButton column={column} addTask={addTask} />
      </div>
      <Droppable droppableId={column.id}>
        {(provided) => {
          return (
            <div
              className="task_list"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {tasks.map((task, index) => (
                <Task key={task.id} task={task} index={index} />
              ))}
              {provided.placeholder}
            </div>
          );
        }}
      </Droppable>
    </div>
  );
}

export default Column;


// </div>
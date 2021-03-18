import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import "./App.css";
import Column from "./components/column/Column";
import initialData from "./util/initial";
import Util from "./util/util";

function App() {
  const [state, setState] = useState(initialData);
  useEffect(() => {
    if (Util.getData()) {
      setState(Util.getData());
    }
  }, []);
  useEffect(() => {
    Util.setData(state);
  }, [state]);

  function updateColumTitle(title, columnId) {
    const newState = {
      ...state,
      columns: {
        ...state.columns,
        [columnId]: {
          ...state.columns[columnId],
          title: title,
        },
      },
    };
    setState(newState);
  }

  function addTask(column, title, desc) {
    const taskId = `task-${Util.createUID()}`;

    const newTask = {
      [taskId]: {
        id: taskId,
        title: title,
        content: desc,
      },
    };
    const newState = {
      ...state,
      tasks: {
        ...state.tasks,
        ...newTask,
      },
      columns: {
        ...state.columns,
        [column.id]: {
          ...state.columns[column.id],
          taskIds: [
            ...state.columns[column.id]["taskIds"],
            ...Object.keys(newTask),
          ],
        },
      },
    };
    setState(newState);
  }

  function addColumn() {
    const colId = `col-${Util.createUID()}`;

    const newColumn = {
      [colId]: {
        id: colId,
        title: "Enter Column Title",
        taskIds: [],
      },
    };

    const newState = {
      ...state,
      columns: {
        ...state.columns,
        ...newColumn,
      },
      columnOrder: [...state.columnOrder, Object.keys(newColumn)],
    };
    setState(newState);
  }

  function handleOnDragEnd(result) {
    const { destination, source, draggableId, type } = result;
    if (!destination) {
      return;
    }
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    if (type === "column") {
      const newColumnOrder = state.columnOrder;
      newColumnOrder.splice(source.index, 1);
      newColumnOrder.splice(destination.index, 0, draggableId);

      const newState = {
        ...state,
        columnOrder: newColumnOrder,
      };
      setState(newState);
      return;
    }
    const startCol = state.columns[source.droppableId];
    const finishCol = state.columns[destination.droppableId];

    if (startCol === finishCol) {
      const newTaskIds = [...startCol.taskIds];
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);

      const newColumn = {
        ...startCol,
        taskIds: newTaskIds,
      };
      const newState = {
        ...state,
        columns: {
          ...state.columns,
          [newColumn.id]: newColumn,
        },
      };

      setState(newState);
      return;
    }
    const startTaskIds = [...startCol.taskIds];
    startTaskIds.splice(source.index, 1);
    const newStart = {
      ...startCol,
      taskIds: startTaskIds,
    };

    const finishTaskIds = [...finishCol.taskIds];
    finishTaskIds.splice(destination.index, 0, draggableId);
    const newFinish = {
      ...finishCol,
      taskIds: finishTaskIds,
    };

    const newState = {
      ...state,
      columns: {
        ...state.columns,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish,
      },
    };
    setState(newState);
    return;
  }
  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <Droppable droppableId="all-columns" direction="horizontal" type="column">
        {(provided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="app"
          >
            <div className="columns_container">
              {state.columnOrder.map((columnId, index) => {
                const column = state.columns[columnId];
                const tasks = column.taskIds.map(
                  (taskId) => state.tasks[taskId]
                );

                return (
                  <Column
                    key={column.id}
                    column={column}
                    tasks={tasks}
                    addTask={addTask}
                    updateColumTitle={updateColumTitle}
                    index={index}
                  />
                );
              })}
              <span
                className="add_section"
                onClick={() => {
                  addColumn();
                }}
              >
                Add Section
              </span>
            </div>
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}

export default App;

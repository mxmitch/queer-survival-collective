import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

// Initial data structure
const initialData = {
  tasks: {
    "task-1": { id: "task-1", content: "Create wireframe" },
    "task-2": { id: "task-2", content: "Set up project" },
    "task-3": { id: "task-3", content: "Build Kanban board" },
  },
  columns: {
    "to-do": { id: "to-do", title: "To-Do", taskIds: ["task-1", "task-2"] },
    "in-progress": { id: "in-progress", title: "In-Progress", taskIds: [] },
    "done": { id: "done", title: "Done", taskIds: ["task-3"] },
  },
  columnOrder: ["to-do", "in-progress", "done"],
};

const KanbanBoard = () => {
  const [boardData, setBoardData] = useState(initialData);

  // Handle the drag and drop logic
  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    // If dropped outside the droppable area
    if (!destination) return;

    // If dropped in the same place (no change)
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;

    // Get source and destination columns
    const sourceColumn = boardData.columns[source.droppableId];
    const destinationColumn = boardData.columns[destination.droppableId];

    // Make copies of the task arrays for source and destination columns
    const sourceTasks = Array.from(sourceColumn.taskIds);
    sourceTasks.splice(source.index, 1); // Remove task from source column

    const destinationTasks = Array.from(destinationColumn.taskIds);
    destinationTasks.splice(destination.index, 0, draggableId); // Add task to destination column

    // Update the board state with the new task order
    setBoardData((prevData) => ({
      ...prevData,
      columns: {
        ...prevData.columns,
        [sourceColumn.id]: { ...sourceColumn, taskIds: sourceTasks },
        [destinationColumn.id]: { ...destinationColumn, taskIds: destinationTasks },
      },
    }));
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        {boardData.columnOrder.map((columnId) => {
          const column = boardData.columns[columnId];
          const tasks = column.taskIds.map((taskId) => boardData.tasks[taskId]);

          return (
            <Droppable key={column.id} droppableId={column.id}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  style={{
                    background: "#e2e4e6",
                    padding: "10px",
                    width: "300px",
                    minHeight: "500px",
                    margin: "0 10px",
                    borderRadius: "8px",
                  }}
                >
                  <h2 style={{ textAlign: "center" }}>{column.title}</h2>
                  {tasks.map((task, index) => (
                    <Draggable key={task.id} draggableId={task.id} index={index}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          style={{
                            backgroundColor: "#fff",
                            padding: "10px",
                            margin: "5px 0",
                            borderRadius: "5px",
                            boxShadow: "0 1px 2px rgba(0,0,0,0.1)",
                            ...provided.draggableProps.style,
                          }}
                        >
                          {task.content}
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          );
        })}
      </div>
    </DragDropContext>
  );
};

export default KanbanBoard;
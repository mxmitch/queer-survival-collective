import React, { useState } from 'react';
import axios from 'axios';
import Card from './Card';  // Import Card component

const Column = ({ boardColumns, onTaskCreated }) => {
    const [showModal, setShowModal] = useState(false);
    const [taskTitle, setTaskTitle] = useState('');
    const [taskDescription, setTaskDescription] = useState('');
    const [selectedColumn, setSelectedColumn] = useState(null); // Track which column the task is for

    if (!boardColumns || boardColumns.length === 0) return <p>No columns yet</p>;

    const handleTaskSubmit = async (e) => {
        e.preventDefault();
        if (!selectedColumn) return;

        const newTask = {
            title: taskTitle,
            description: taskDescription,
            column_id: selectedColumn.column_id, // Assign to selected column
        };

        try {
            const response = await axios.post('http://localhost:5000/api/tasks', newTask);
            onTaskCreated(response.data); // Update UI with the new task
            setShowModal(false);
            setTaskTitle('');
            setTaskDescription('');
        } catch (error) {
            console.error('Error creating task:', error);
        }
    };

    return (
        <div className="board">
            {boardColumns.map(column => (
                <div key={column.column_id} className="column">
                    <h3>{column.column_name}</h3>
                    <button onClick={() => { setShowModal(true); setSelectedColumn(column); }}>+ Add Task</button>

                    {/* Render tasks for this column */}
                    <div className="cards">
                        {column.cards && column.cards.length > 0 ? (
                            column.cards.map(card => <Card key={card.task_id} card={card} />)
                        ) : (
                            <p>No tasks</p>
                        )}
                    </div>
                </div>              
            ))}

            {/* Modal for Creating a Task */}
            {showModal && (
                <div className="modal">
                    <div className="modal-content">
                        <h4>Create New Task in "{selectedColumn?.column_name}"</h4>
                        <form onSubmit={handleTaskSubmit}>
                            <input
                                type="text"
                                placeholder="Task Title"
                                value={taskTitle}
                                onChange={(e) => setTaskTitle(e.target.value)}
                                required
                            />
                            <textarea
                                placeholder="Task Description"
                                value={taskDescription}
                                onChange={(e) => setTaskDescription(e.target.value)}
                                required
                            />
                            <button type="submit">Create Task</button>
                            <button type="button" onClick={() => setShowModal(false)}>Cancel</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Column;

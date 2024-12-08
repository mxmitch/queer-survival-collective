import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Task = ({ columnId }) => {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:5000/api/tasks/${columnId}`)
            .then(response => setTasks(response.data))
            .catch(error => console.error('Error fetching tasks:', error));
    }, [columnId]);

    return (
        <div>
            {tasks.map(task => (
                <div key={task.task_id} style={{ padding: '5px', border: '1px solid #ddd', margin: '5px' }}>
                    <h4>{task.task_title}</h4>
                    <p>{task.description}</p>
                    <p>Priority: {task.priority}</p>
                </div>
            ))}
        </div>
    );
};

export default Task;

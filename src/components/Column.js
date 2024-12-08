import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Task from './Task';

const Column = ({ boardId }) => {
    const [columns, setColumns] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:5000/api/columns/${boardId}`)
            .then(response => setColumns(response.data))
            .catch(error => console.error('Error fetching columns:', error));
    }, [boardId]);

    return (
        <div style={{ display: 'flex' }}>
            {columns.map(column => (
                <div key={column.column_id} style={{ margin: '10px', padding: '10px', border: '1px solid #ccc' }}>
                    <h3>{column.column_name}</h3>
                    <Task columnId={column.column_id} />
                </div>
            ))}
        </div>
    );
};

export default Column;

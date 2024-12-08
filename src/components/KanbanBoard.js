import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Column from './Column';

const KanbanBoard = () => {
    const [boards, setBoards] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/api/boards')
            .then(response => setBoards(response.data))
            .catch(error => console.error('Error fetching boards:', error));
    }, []);

    return (
        <div>
            <h1>Kanban Board</h1>
            {boards.map(board => (
                <div key={board.board_id}>
                    <h2>{board.board_name}</h2>
                    <Column boardId={board.board_id} />
                </div>
            ))}
        </div>
    );
};

export default KanbanBoard;


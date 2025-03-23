import React from 'react';
import Board from "../components/Board"

const Kanban = () => {
    return (
        <div style={{ padding: "20px" }}>
            <h1>Kanban Board</h1>
            <Board/>
        </div>
    );
};

export default Kanban;
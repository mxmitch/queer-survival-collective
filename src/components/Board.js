import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Column from './Column';
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';

const Board = () => {
    const [boards, setBoards] = useState([]);
    const [open, setOpen] = useState(false);
    const [newColumnName, setNewColumnName] = useState('');
    const [selectedBoardId, setSelectedBoardId] = useState(null);

    // 🔄 Fetch boards on component mount
    useEffect(() => {
        fetchBoards();
    }, []);

    const fetchBoards = async () => {
        try {
            const token = localStorage.getItem('token'); // Get auth token
            const response = await axios.get('http://localhost:5000/api/boards', {
                headers: { Authorization: `Bearer ${token}` }
            });
            console.log('Fetched boards:', response.data);
            setBoards(response.data);
        } catch (error) {
            console.error('Error fetching boards:', error.response?.data || error.message);
        }
    };

    // 📌 Open modal for column creation
    const handleClickOpen = (boardId) => {
        setSelectedBoardId(boardId);
        setOpen(true);
    };

    // ❌ Close modal
    const handleClose = () => {
        setOpen(false);
        setNewColumnName('');
    };

    // ➕ Create new column in DB and update UI instantly
    const handleCreateColumn = async () => {
        if (selectedBoardId && newColumnName) {
            try {
                const token = localStorage.getItem('token');
                const board = boards.find(b => b.board_id === selectedBoardId);
                const newPosition = board?.columns?.length || 0; // Dynamic position

                const response = await axios.post(
                    'http://localhost:5000/api/columns',
                    {
                        board_id: selectedBoardId,
                        column_name: newColumnName,
                        position: newPosition
                    },
                    {
                        headers: { Authorization: `Bearer ${token}` }
                    }
                );

                const newColumn = response.data;

                setBoards(prevBoards =>
                    prevBoards.map(board =>
                        board.board_id === selectedBoardId
                            ? { ...board, columns: [...(board.columns || []), newColumn] }
                            : board
                    )
                );

                handleClose();
            } catch (error) {
                console.error('Error creating column:', error.response?.data || error.message);
            }
        }
    };

    return (
        <div>
            {boards.map(board => (
                <div key={board.board_id} className="board">
                    <h2>{board.board_name}</h2>
                    <Button variant="contained" color="primary" onClick={() => handleClickOpen(board.board_id)}>
                        + Add Column
                    </Button>
                    <div className="columns">
                        <Column boardColumns={board.columns ?? []} />
                    </div>
                </div>
            ))}

            {/* 🔽 Column Creation Dialog */}
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Create New Column</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Column Name"
                        fullWidth
                        value={newColumnName}
                        onChange={(e) => setNewColumnName(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleCreateColumn} color="primary">
                        Create
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default Board;
import React, { useState, useEffect } from 'react';
import { getBoards, getLists, getCards } from './trelloService';

const KanbanBoard = () => {
  const [boards, setBoards] = useState([]);
  const [lists, setLists] = useState([]);
  const [cards, setCards] = useState({});
  const [selectedBoard, setSelectedBoard] = useState(null);

  useEffect(() => {
    // Fetch boards on mount
    const fetchBoards = async () => {
      const fetchedBoards = await getBoards();
      setBoards(fetchedBoards);
    };
    fetchBoards();
  }, []);

  const handleBoardSelect = async (boardId) => {
    setSelectedBoard(boardId);
    const fetchedLists = await getLists(boardId);
    setLists(fetchedLists);

    // Fetch cards for each list
    const listCards = {};
    for (const list of fetchedLists) {
      const fetchedCards = await getCards(list.id);
      listCards[list.id] = fetchedCards;
    }
    setCards(listCards);
  };

  return (
    <div>
      <h1>Kanban Board</h1>
      <div>
        <h2>Boards</h2>
        <ul>
          {boards.map((board) => (
            <li key={board.id} onClick={() => handleBoardSelect(board.id)}>
              {board.name}
            </li>
          ))}
        </ul>
      </div>

      {selectedBoard && (
        <div>
          <h2>Lists</h2>
          <div style={{ display: 'flex' }}>
            {lists.map((list) => (
              <div key={list.id} style={{ margin: '0 20px', border: '1px solid #ccc', padding: '10px' }}>
                <h3>{list.name}</h3>
                <ul>
                  {cards[list.id]?.map((card) => (
                    <li key={card.id}>{card.name}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default KanbanBoard;

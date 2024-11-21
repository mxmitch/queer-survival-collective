import React, { useState, useEffect } from 'react';
import axios from 'axios';

const KanbanBoard = ({ boardId }) => {
  const [board, setBoard] = useState(null);
  const [lists, setLists] = useState([]);
  const [cards, setCards] = useState({});

  useEffect(() => {
    const fetchBoardData = async () => {
      const params = {
        key: process.env.REACT_APP_TRELLO_API_KEY,
        token: process.env.REACT_APP_TRELLO_TOKEN,
      };

      try {
        // Fetch board details
        const boardResponse = await axios.get(
          `https://api.trello.com/1/boards/${boardId}`,
          { params }
        );
        setBoard(boardResponse.data);

        // Fetch lists
        const listsResponse = await axios.get(
          `https://api.trello.com/1/boards/${boardId}/lists`,
          { params }
        );
        setLists(listsResponse.data);

        // Fetch cards for each list
        const cardsData = {};
        for (const list of listsResponse.data) {
          const cardsResponse = await axios.get(
            `https://api.trello.com/1/lists/${list.id}/cards`,
            { params }
          );
          cardsData[list.id] = cardsResponse.data;
        }
        setCards(cardsData);
      } catch (error) {
        console.error('Error fetching board data:', error);
      }
    };

    fetchBoardData();
  }, [boardId]);

  return (
    <div>
      {board && <h1>{board.name}</h1>}
      <div style={{ display: 'flex' }}>
        {lists.map((list) => (
          <div key={list.id} style={{ margin: '10px', padding: '10px', border: '1px solid #ccc' }}>
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
  );
};

export default KanbanBoard;

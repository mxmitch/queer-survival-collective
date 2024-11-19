import axios from 'axios';

const API_URL = 'https://api.trello.com/1';

const getBoards = async () => {
  const response = await axios.get(`${API_URL}/members/me/boards`, {
    params: {
      key: process.env.REACT_APP_TRELLO_API_KEY,
      token: process.env.REACT_APP_TRELLO_TOKEN,
    },
  });
  return response.data;
};

const getLists = async (boardId) => {
  const response = await axios.get(`${API_URL}/boards/${boardId}/lists`, {
    params: {
      key: process.env.REACT_APP_TRELLO_API_KEY,
      token: process.env.REACT_APP_TRELLO_TOKEN,
    },
  });
  return response.data;
};

const getCards = async (listId) => {
  const response = await axios.get(`${API_URL}/lists/${listId}/cards`, {
    params: {
      key: process.env.REACT_APP_TRELLO_API_KEY,
      token: process.env.REACT_APP_TRELLO_TOKEN,
    },
  });
  return response.data;
};

export { getBoards, getLists, getCards };



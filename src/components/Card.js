// src/components/Card.js
import React from 'react';

const Card = ({ card }) => {
  return (
    <div className="card">
      <h4 className="card-title">{card.title}</h4>
      <p className="card-description">{card.description}</p>
    </div>
  );
};

export default Card;

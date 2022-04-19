import React from 'react';

function Card({ card, onCardClick }) {

    function handleClick() {
        onCardClick(card);
    };

    return (
        <li className="card">
            <img className="card__image" src={card.link} onClick={handleClick} />
            <button className="button card__delete-button"></button>
            <div className="card__panel">
                <h2 className="card__city">{card.name}</h2>
                <div className="card__like-container">
                    <button type="button" aria-label="Мне нравится" className="button card__like-button"></button>
                    <span className="card__like-count"></span>
                </div>
            </div>
        </li>

    );
};

export default Card;
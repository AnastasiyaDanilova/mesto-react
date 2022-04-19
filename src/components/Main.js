import React from 'react';
import { api } from '../utils/Api.js';
import Card from "../components/Card.js";


function Main({ onEditProfile, onEditAvatar, onAddPlace, onCardClick }) {

    const [userName, setUserName] = React.useState('');
    const [userDescription, setUserDescription] = React.useState('');
    const [userAvatar, setUserAvatar] = React.useState('');
    const [cards, setСards] = React.useState([]);

    React.useEffect(() => {
        Promise.all([api.getInitialCards(), api.getProfile()])
            .then(([cardList, userData]) => {
                setUserName(userData.name);
                setUserDescription(userData.about);
                setUserAvatar(userData.avatar);
                setСards(cardList);
            }).catch(console.log)
    }, [])

    return (
        <div>
            <section className="profile">
                <div className="profile__about">
                    <button type="button" aria-label="Редактировать аватар"
                        className="button avatar-button button_type_change-avatar avatar-popup-button" onClick={onEditAvatar}>
                        {userAvatar && <img alt="аватар" className="profile__photo" src={userAvatar} />}
                    </button>

                    <div className="profile__info">
                        <div className="profile__container">
                            <h1 className="profile__name">{userName}</h1>
                            <button type="button" aria-label="Редактировать профиль"
                                className=" button button_type_edit-info profile-button profile-popup-button" onClick={onEditProfile}></button>
                        </div>

                        <p className="profile__description" >{userDescription}</p>
                    </div>

                </div>

                <button type="button" aria-label="Добавить фото"
                    className="button place-button button_type_add-card place-popup-button" onClick={onAddPlace}></button>
            </section>

            <section className="cards">

                <ul className="cards__list">
                    {cards.map((item) =>
                        <Card onCardClick={onCardClick} card={item} key={item._id} />
                    )}
                </ul>

            </section>
        </div>
    );
};

export default Main;
import React from 'react';
import { api } from '../utils/Api.js';
import Card from "../components/Card.js";


function Main(props) {

    const [userName, setuserName] = React.useState('');
    const [userDescription, setuserDescription] = React.useState('');
    const [userAvatar, setuserAvatar] = React.useState('');
    const [cards, setcards] = React.useState([]);

    React.useEffect(() => {
        Promise.all([api.getInitialCards(), api.getProfile()])
            .then(([cardList, userData]) => {
                setuserName(userData.name);
                setuserDescription(userData.about);
                setuserAvatar(userData.avatar);
                setcards(cardList);
            }).catch(console.log)
    }, [])

    return (
        <div>
            <section className="profile">
                <div className="profile__about">
                    <button type="button" aria-label="Редактировать аватар"
                        className="button avatar-button button_type_change-avatar avatar-popup-button" onClick={props.onEditAvatar}>
                        <img alt="аватар" className="profile__photo" src={userAvatar} />
                    </button>

                    <div className="profile__info">
                        <div className="profile__container">
                            <h1 className="profile__name">{userName}</h1>
                            <button type="button" aria-label="Редактировать профиль"
                                className=" button button_type_edit-info profile-button profile-popup-button" onClick={props.onEditProfile}></button>
                        </div>

                        <p className="profile__description" >{userDescription}</p>
                    </div>

                </div>

                <button type="button" aria-label="Добавить фото"
                    className="button place-button button_type_add-card place-popup-button" onClick={props.onAddPlace}></button>
            </section>

            <section className="cards">

                <ul className="cards__list">
                    {cards.map((item) =>
                        <Card onCardClick={props.onCardClick} card={item} key={item._id} />
                    )}
                </ul>

            </section>
        </div>
    );
};

export default Main;
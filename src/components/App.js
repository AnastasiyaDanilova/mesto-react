// Благодарю за быструю проверку :) 
// текста на кнопках нет, потому с самого начала проекта кнопка появлялась и менялась c bckground-image
// исправила, теперь редактируется в кнопке только текст и цвет :)

import React from "react";
import '../index.css';
import PopupWithForm from "./PopupWithForm.js";
import ImagePopup from "./ImagePopup.js";
import Header from "./Header.js";
import Footer from "./Footer.js";
import Main from "./Main.js";


function App() {

    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
    const [selectedCard, setSelectedCard] = React.useState({});


    function handleEditProfileClick() {
        setIsEditProfilePopupOpen(true);
    };

    function handleEditAvatarClick() {
        setIsEditAvatarPopupOpen(true);
    };

    function handleAddPlaceClick() {
        setIsAddPlacePopupOpen(true);
    };

    function handleCardClick(card) {
        setSelectedCard(card);
    };

    function closeAllPopups() {
        setIsEditProfilePopupOpen(false);
        setIsEditAvatarPopupOpen(false);
        setIsAddPlacePopupOpen(false);
        setSelectedCard({});
    };

    return (
        <div className="page">
            <div className="content">
                <Header />
                <Main onCardClick={handleCardClick} onEditProfile={handleEditProfileClick}
                    onAddPlace={handleAddPlaceClick} onEditAvatar={handleEditAvatarClick} />
                <Footer />
            </div>

            <PopupWithForm name="profile" title="Редактировать профиль" isOpen={isEditProfilePopupOpen} onClose={closeAllPopups}  buttonText="Сохранить">
                <input id="name-input" required type="text" name="name" placeholder="Ваше имя"
                    className="popup__input popup__input_type_name" minLength="2" maxLength="40" />
                <span className="name-input-error popup__error"></span>

                <input id="job-input" required type="text" name="job" placeholder="Ваша профессия"
                    className="popup__input popup__input_type_job" minLength="2" maxLength="200" />
                <span className="job-input-error popup__error"></span>
            </PopupWithForm >

            <PopupWithForm name="place" title="Новое место" isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} buttonText="Создать">
                <input id="place-input" required type="text" name="place-name" placeholder="Название"
                    className="popup__input popup__input_type_name" minLength="2" maxLength="30" />
                <span className="place-input-error popup__error"></span>

                <input id="url-input-place" required type="url" name="link" placeholder="Ссылка на картинку"
                    className="popup__input popup__input_type_job" />
                <span className="url-input-place-error popup__error"></span>
            </PopupWithForm >

            <PopupWithForm name="avatar" title="Обновить аватар" isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} buttonText="Сохранить">
                <input id="url-input" required type="url" name="link" placeholder="Ссылка на картинку"
                    className="popup__input popup__input_type_job" />
                <span className="url-input-error popup__error"></span>
            </PopupWithForm >

            <PopupWithForm name="delete" title="Вы уверены?" buttonText="Да"/>
            <ImagePopup card={selectedCard} onClose={closeAllPopups} />
        </div>
    );
};

export default App;
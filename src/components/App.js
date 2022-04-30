import React from "react";
import '../index.css';
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";
import PopupWithForm from "./PopupWithForm.js";
import EditProfilePopup from "./EditProfilePopup.js";
import EditAvatarPopup from "./EditAvatarPopup.js";
import AddPlacePopup from "./AddPlacePopup.js";
import ImagePopup from "./ImagePopup.js";
import Header from "./Header.js";
import Footer from "./Footer.js";
import Main from "./Main.js";
import { api } from "../utils/Api";


function App() {

    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
    const [selectedCard, setSelectedCard] = React.useState({});
    const [currentUser, setСurrentUser] = React.useState({});
    const [cards, setСards] = React.useState([]);

    // попапы открытие, закрытие
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

    // редактирование: хук, профиль, аватар
    React.useEffect(() => {
        api.getProfile().then(res => {
            setСurrentUser(res);
        }).catch(console.log);
    }, []);

    function handleUpdateUser(user) {
        api.editProfile(user.name, user.about).then((res) => {
            setСurrentUser(res);
            closeAllPopups();
        }).catch(console.log);
    };

    function handleUpdateAvatar(user) {
        api.changeAvatar(user.avatar).then((res) => {
            setСurrentUser(res);
            closeAllPopups();
        }).catch(console.log);
    };

    //карточки: хук, добавление, лайк, удаление 
    React.useEffect(() => {
        Promise.all([api.getInitialCards()])
            .then(([cardList]) => {
                setСards(cardList);
            }).catch(console.log);
    }, []);

    function handleAddPlaceSubmit(card) {
        api.addCard(card.name, card.link).then((newCard) => {
            setСards([newCard, ...cards]);
            closeAllPopups();
        });
    };

    function handleCardLike(card) {
        const isLiked = card.likes.some(i => i._id === currentUser._id);

        api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {
            setСards((state) => state.map((c) => c._id === card._id ? newCard : c));
        }).catch(console.log);
    };

    function handleCardDelete(card) {
        api.deleteCard(card._id).then(() => {
            setСards((state) => state.filter((c) => c._id !== card._id))
        }).catch(console.log);
    };

    return (
        <CurrentUserContext.Provider value={currentUser}>
            <div className="page">
                <div className="content">
                    <Header />
                    <Main cards={cards} onCardLike={handleCardLike} onCardDelete={handleCardDelete} onCardClick={handleCardClick} onEditProfile={handleEditProfileClick}
                        onAddPlace={handleAddPlaceClick} onEditAvatar={handleEditAvatarClick} />
                    <Footer />
                </div>

                <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />

                <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />

                <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit} />

                <PopupWithForm name="delete" title="Вы уверены?" buttonText="Да" />
                
                <ImagePopup card={selectedCard} onClose={closeAllPopups} />
            </div>
        </CurrentUserContext.Provider>
    );
};

export default App;
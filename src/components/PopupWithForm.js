import React from 'react';

function PopupWithForm(props) {
    return (
        <div className={`popup popup_type_${props.name} ${props.isOpen && 'popup_open'}`} id={`${props.name}-popup`} >
            <div className="popup__container">
                <button type="button" aria-label="Закрыть" className="button button_type_close-popup" onClick={props.onClose}></button>
                <h2 className="popup__title">{props.title}</h2>

                <form className="popup__form" id={props.name} name={`popup-${props.name}-form`} noValidate>
                    {props.children}
                    <button type="submit" aria-label="Отправить" className="button button_type_submit"></button>
                </form>
            </div>
        </div>
    );
};

export default PopupWithForm;
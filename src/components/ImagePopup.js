import React from 'react';

function ImagePopup(props) {
    return (
        <div className={`popup popup_type_image ${props.card.name && 'popup_open'}`} id="popup-image">
            <figure className="popup__figure">
                <button type="button" aria-label="Закрыть" className="button button_type_close-popup" onClick={props.onClose} ></button>
                <img className="popup__image" src={props.card.link} />
                <figcaption className="popup__fig-caption">{props.card.name}</figcaption>
            </figure>
        </div>
    );
};

export default ImagePopup;
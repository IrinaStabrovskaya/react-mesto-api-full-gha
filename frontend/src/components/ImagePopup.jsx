import React from "react";

const ImagePopup = ({card, isOpen, onClose}) => { 
  
  return (
    <div
      className={`pop-up pop-up_type_big-pic ${
        isOpen ? `pop-up_opened` : " "
      }`}
    >
      <div className="pop-up__container pop-up__container_type_big-pic">
        <button
          className="pop-up__close-btn btn-hover"
          type="button"
          onClick={onClose}
        ></button>
        <figure className="pop-up__pic">
          <img
            className="pop-up__image"
            src={card.link}
            alt={card.name}
          />
          <figcaption className="pop-up__caption">{card.name}</figcaption>
        </figure>
      </div>
    </div>
  );
};

export default ImagePopup;

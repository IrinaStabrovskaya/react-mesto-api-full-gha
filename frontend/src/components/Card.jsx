import React, { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
//в этом компоненте использован дополнительный функционал
// контейнера лайков и отображения количества лайков
//т.е. если лайков нет, то их количество не отображается, если есть, то все отображается по ТЗ.
//Этот функционал был применен в ПР9, поэтому реализован и этой работе.

const Card = ({
  link,
  name,
  likes,
  cardId,
  ownerId,
  onCardClick,
  onCardLike,
  onCardDelete,
}) => {
  const currentUser = useContext(CurrentUserContext);
  const hasLikes = likes.length !== 0;
  const isOwn = ownerId === currentUser._id;
  const isLiked = likes.some((i) => i._id === currentUser._id);
  const cardLikeButtonClassName = `photos__heart-btn ${
    isLiked && "photos__heart-btn_active"
  }`;

  function handleClick() {
    onCardClick({ link, name });
  }

  function handleLikeClick() {
    onCardLike({ cardId, likes });
  }

  function handleDeleteClick() {
    onCardDelete({ cardId });
    console.log(cardId);
  }

  return (
    <li className="photos__element">
      {isOwn && (
        <button
          className="photos__delete-btn btn-hover"
          type="button"
          onClick={handleDeleteClick}
        ></button>
      )}
      <img
        className="photos__image"
        src={link}
        alt={name}
        onClick={handleClick}
      />
      <div className="photos__description">
        <h2 className="photos__title">{name}</h2>
        <div
          className={`photos__like ${
            !hasLikes ? "" : `photos__like_with-counter`
          }`}
        >
          <button
            className={cardLikeButtonClassName}
            type="button"
            onClick={handleLikeClick}
          ></button>
          <div className="photos__like-counter">
            {!hasLikes ? "" : `${likes.length}`}
          </div>
        </div>
      </div>
    </li>
  );
};

export default Card;

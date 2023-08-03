import React, { useContext } from "react";
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import Header from "./Header";
import { Link, useNavigate } from "react-router-dom";

function Main(props) {
  const currentUser = useContext(CurrentUserContext);
  const navigate = useNavigate();
  const initialCards = props.cards.map((card) => (
    <Card
      key={card._id}
      name={card.name}
      link={card.link}
      likes={card.likes}
      cardId={card._id}
      ownerId={card.owner._id}
      onCardClick={props.onCardClick}
      onCardLike={props.onCardLike}
      onCardDelete={props.onCardDelete}
    />
  ));

  function signOut() {
    localStorage.removeItem("token");
    navigate("/sign-in");
    props.setUser("");
  }

  return (
    <>
      <Header>
        <p className="header__email">{`${props.user}`}</p>
        <Link
          to="/sign-in"
          className="header__link header__link_type_main"
          onClick={signOut}
        >
          Выйти
        </Link>
      </Header>
      <main className="content">
        <section className="profile">
          <button className="profile__avatar-btn" onClick={props.onEditAvatar}>
            <img
              className="profile__avatar"
              src={currentUser.avatar}
              alt="аватар пользователя"
            />
          </button>
          <div className="profile__info">
            <div className="profile__description">
              <h1 className="profile__title">{currentUser.name}</h1>
              <p className="profile__subtitle">{currentUser.about}</p>
            </div>
            <button
              className="profile__edit-btn btn-hover"
              type="button"
              onClick={props.onEditProfile}
            ></button>
          </div>
          <button
            className="profile__add-btn btn-hover"
            type="button"
            onClick={props.onAddPlace}
          ></button>
        </section>

        <section className="photos">
          <ul className="photos__elements">{initialCards}</ul>
        </section>
      </main>
    </>
  );
}
export default Main;

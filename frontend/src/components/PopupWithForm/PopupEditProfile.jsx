import React, { useState, useEffect, useContext } from "react";
import PopupWithForm from "../PopupWithForm";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

const PopupEditProfile = (props) => {
  const currentUser = useContext(CurrentUserContext);
  const [nameUser, setNameUser] = useState(currentUser.name);
  const [description, setDescription] = useState(currentUser.about);

  useEffect(() => {
    setNameUser(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser]);

  function handleChangeName(e) {
    setNameUser(e.target.value);
  }

  function handleChangeDescription(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateUser({
      name: nameUser,
      about: description,
    });
  }

  return (
    <PopupWithForm
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      name="edit"
      title="Редактировать профиль"
      text={props.isLoading ? "Сохранение..." : "Сохранить"}
    >
      <input
        className="pop-up__form-input pop-up__form-input_type_name"
        required
        type="text"
        name="name"
        value={nameUser || ""}
        onChange={handleChangeName}
        placeholder="Имя"
        minLength="2"
        maxLength="40"
      />

      <span className="pop-up__form-input-error name-error"></span>

      <input
        className="pop-up__form-input pop-up__form-input_type_about"
        required
        type="text"
        name="about"
        value={description || ""}
        onChange={handleChangeDescription}
        placeholder="О себе"
        minLength="2"
        maxLength="200"
      />

      <span className="pop-up__form-input-error about-error"></span>
    </PopupWithForm>
  );
};
export default PopupEditProfile;

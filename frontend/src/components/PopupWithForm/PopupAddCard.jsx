import React, { useState, useEffect } from "react";
import PopupWithForm from "../PopupWithForm";


const PopupAddCard = (props) => {
  const [cardName, setCardName] = useState("");
  const [cardLink, setCardLink] = useState("");

  function handleChangeCardName(e) {
    setCardName(e.target.value);
  }

  function handleChangeCardLink(e) {
    setCardLink(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    props.onAddNewCard({
      name: cardName,
      link: cardLink,
    });
  }

  useEffect(() => {
    setCardName("");
    setCardLink("");
  }, [props.isOpen]);

  return (
    <PopupWithForm
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      name="create-card"     
      title="Новое место"
      text={props.isLoading ? "Сохранение..." : "Создать"}
    >
      <input
        className="pop-up__form-input pop-up__form-input_type_place-title"
        required
        type="text"
        name="name"
        value={cardName || ""}
        onChange={handleChangeCardName}
        placeholder="Название"
        minLength="2"
        maxLength="30"
      />

      <span className="pop-up__form-input-error name-error"></span>

      <input
        className="pop-up__form-input pop-up__form-input_type_link"
        required
        type="url"
        name="link"
        value={cardLink || ""}
        onChange={handleChangeCardLink}
        placeholder="Ссылка на картинку"
      />

      <span className="pop-up__form-input-error link-error"></span>
    </PopupWithForm>
  );
};

export default PopupAddCard;

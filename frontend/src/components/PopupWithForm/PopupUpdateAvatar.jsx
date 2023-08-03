import React, { useRef, useEffect } from "react";
import PopupWithForm from "../PopupWithForm";

const PopupUpdateAvatar = (props) => {
  const inputLink = useRef("");

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateAvatar({
      avatar: inputLink.current.value,
    });
  }

  useEffect(() => {
    inputLink.current.value = "";
  }, [props.isOpen]);

  return (
    <PopupWithForm
      isOpen={props.isOpen}
      onClose={props.onClose}
      name="avatar"
      nameContainer="avatar"
      title="Обновить аватар"
      text={props.isLoading ? "Сохранение..." : "Сохранить"}
      onSubmit={handleSubmit}
    >
      <input
        className="pop-up__form-input pop-up__form-input_type_link"
        ref={inputLink}
        required
        type="url"
        name="link"
        placeholder="Ссылка на аватар"
      />
      <span className="pop-up__form-input-error link-error"></span>
    </PopupWithForm>
  );
};

export default PopupUpdateAvatar;

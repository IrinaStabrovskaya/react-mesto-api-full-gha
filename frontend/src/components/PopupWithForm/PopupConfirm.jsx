import React from "react";
import PopupWithForm from "../PopupWithForm";

const PopupConfirm = (props) => {
  return (
    <PopupWithForm
      isOpen={props.isOpen}
      onClose={props.onClose}
      name="confirm"
      title="Вы уверены?"
      nameTitle="confirm"
      text="Да"
      nameContainer="confirm"
    ></PopupWithForm>
  );
};

export default PopupConfirm;

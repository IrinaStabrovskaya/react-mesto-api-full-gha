import React from "react";
import Popup from "./Popup";

const PopupWithForm = (props) => {
  return (
    <Popup
      isOpen={props.isOpen}
      onClose={props.onClose}
      nameContainer={props.nameContainer}
    >
      <h2
        className={`pop-up__title pop-up__title_type_${props.nameTitle}`}
      >{`${props.title}`}</h2>

      <form
        className={`pop-up__form name=${props.name} action="#" noValidate`}
        onSubmit={props.onSubmit}
      >
        {props.children}
        <button className="pop-up__form-save-btn" type="submit" name="save-btn">
          {`${props.text}`}
        </button>
      </form>
    </Popup>
  );
};

export default PopupWithForm;

import Popup from "./Popup";
import registerEr from "../images/registerEr.png";
import registerOk from "../images/registerOk.png";

const InfoTooltip = (props) => {  
  return (
    <Popup name="infoTooltip" isOpen={props.isOpen} onClose={props.onClose}>
      <img
        className="infoTooltip__image"
        src={props.errorRegister ? registerEr : registerOk}
        alt="изображение удачной регистрации"
      />
      <p className="infoTooltip__text">
        {props.errorRegister
          ? "Что-то пошло не так! Попробуйте ещё раз."
          : "Вы успешно зарегистрировались!"}
      </p>
    </Popup>
  );
};
export default InfoTooltip;

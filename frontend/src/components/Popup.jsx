import { useEffect } from "react";

const Popup = ({ isOpen, onClose, name, children, nameContainer }) => {
  useEffect(() => {
    if (!isOpen) return;

    const closeByEsc = (evt) => {
      if (evt.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", closeByEsc);

    return () => document.removeEventListener("keydown", closeByEsc);
  }, [isOpen, onClose]);

  const handleOverlay = (evt) => {
    if (evt.target === evt.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className={`pop-up pop-up_type_${name} ${isOpen ? `pop-up_opened` : " "}`}
      onMouseDown={handleOverlay}
    >
      <div
        className={`pop-up__container pop-up__container_type_${nameContainer}`}
      >
        <button
          className="pop-up__close-btn btn-hover"
          type="button"
          onClick={onClose}
        ></button>
        {children}
      </div>
    </div>
  );
};

export default Popup;

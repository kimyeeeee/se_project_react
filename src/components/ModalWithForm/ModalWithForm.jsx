import "./ModalWithForm.css";

const ModalWithForm = ({
  children,
  buttonText,
  title,
  onClose,
  name,
  isOpen,
  onSubmit,
}) => {
  if (!isOpen) return null;
  return (
    <div
      className={`modal modal_type_${name} ${
        isOpen ? `header__user_logged-in` : `header__user_logged-out`
      }`}
    >
      <div className="modal__content">
        <button
          className="modal__close-button-gray"
          type="button"
          onClick={onClose}
        >
          X
        </button>
        <h3 className="modal__title">{title}</h3>
        <form className="modal__form" onSubmit={onSubmit}>
          {children}{" "}
          {buttonText && (
            <button className="modal__submit-button" type="submit">
              {buttonText}
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default ModalWithForm;

import "./ItemModal.css";

const ItemModal = ({ selectedCard, onClose }) => {
  return (
    <div className={`modal`}>
      <div className="modal__content modal__content-with-pic">
        <button
          className="modal__close-button-white"
          type="button"
          onClick={onClose}
        >
          X
        </button>
        <img
          className="modal__image"
          src={selectedCard.link}
          alt="popup-of-clothing"
        />
        <div className="modal__description">
          <p className="modal__card-name">{selectedCard.name}</p>
          <div className="modal__weather-type">
            Weather: {selectedCard.weather}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemModal;

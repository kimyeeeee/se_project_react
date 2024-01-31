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
        <img className="modal__image" src={selectedCard.link} />
        <div className="modal__description">
          <div className="modal__card-name">{selectedCard.name}</div>
          <div className="modal__weather-type">
            Weather: {selectedCard.weather}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemModal;

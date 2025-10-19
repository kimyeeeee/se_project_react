import { useContext } from "react";
import "./ItemModal.css";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

const ItemModal = ({ selectedCard, onClose, handleDeleteCard, onCardLike }) => {
  const currentUser = useContext(CurrentUserContext);
  const isOwn = selectedCard.owner === currentUser?._id;

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
          src={selectedCard.imageUrl}
          alt={selectedCard.name}
        />
        <div className="modal__description-container">
          <div className="modal__description">
            <p className="modal__card-name">{selectedCard.name}</p>
            <div className="modal__weather-type">
              Weather: {selectedCard.weather}
            </div>
          </div>
          {isOwn && (
            <button
              className="modal__delete-item-button"
              type="button"
              onClick={handleDeleteCard}
            >
              Delete Item
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ItemModal;

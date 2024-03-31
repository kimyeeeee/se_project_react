import React from "react";

const ConfirmDelete = () => {
  return (
    <div className="modal__delete-modal-container">
      <button
        className="modal__close-button-white"
        type="button"
        onClick={onClose}
      >
        X
      </button>
      <div className="modal__delete-question">
        Are you sure you want to delete this item? This action is irreversible.
      </div>
      <div className="modal__delete-confirmation-buttons">
        <button className="modal__delete-confirmation" type="submit">
          Yes, delete item
        </button>
        <button className="modal__delete-cancellation" type="submit">
          Cancel
        </button>
      </div>
    </div>
  );
};

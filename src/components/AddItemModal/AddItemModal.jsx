import React, { useState, useEffect } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useForm } from "../../hooks/useForm";

const AddItemModal = ({ handleCloseModal, onAddItem, isOpen }) => {
  const { values, handleChange, setValues } = useForm({});

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddItem(values);
  };

  return (
    <ModalWithForm
      className="modal-with-form"
      title="New Garment"
      onClose={handleCloseModal}
      isOpen={isOpen}
      onSubmit={handleSubmit}
    >
      <div className="form__name-container">
        <label htmlFor="name" className="input-title">
          Name
          <input
            className="input-box"
            type="text"
            name="name"
            minLength="1"
            maxLength="30"
            placeholder="Name"
            id="name"
            value={values.name || ""}
            onChange={handleChange}
          />
        </label>
      </div>
      <div className="form__image-container">
        <label htmlFor="url" className="input-title">
          Image
          <input
            className="input-box"
            type="url"
            name="imageUrl"
            minLength="1"
            maxLength="999"
            placeholder="Image URL"
            id="url"
            value={values.imageUrl || ""}
            onChange={handleChange}
          />
        </label>
      </div>
      <div className="form__weather-container">
        <p>Select the weather type:</p>
        <div>
          <div>
            <input
              name="weather"
              type="radio"
              id="hot"
              value="hot"
              onChange={handleChange}
            />
            <label htmlFor="hot"> Hot</label>
          </div>
          <div>
            <input
              name="weather"
              type="radio"
              id="warm"
              value="warm"
              onChange={handleChange}
            />
            <label htmlFor="warm"> Warm</label>
          </div>
          <div>
            <input
              name="weather"
              type="radio"
              id="cold"
              value="cold"
              onChange={handleChange}
            />
            <label htmlFor="cold"> Cold</label>
          </div>
        </div>
      </div>
    </ModalWithForm>
  );
};

export default AddItemModal;

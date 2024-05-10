import React, { useState, useEffect } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

const AddItemModal = ({ handleCloseModal, onAddItem, isOpen }) => {
  const [name, setName] = useState("");
  const handleNameChange = (e) => {
    // console.log(e.target.value);
    setName(e.target.value);
  };

  const [imageUrl, setUrl] = useState("");
  const handleUrlChange = (e) => {
    console.log(e.target.value);
    setUrl(e.target.value);
  };

  const [weather, setWeather] = useState("");
  const handleWeatherChange = (e) => {
    // console.log(e.target.value);
    setWeather(e.target.value);
  };

  useEffect((isOpen) => {
    setName("");
    setUrl("");
    setWeather("");
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddItem({ name, imageUrl, weather }).then(() => handleCloseModal());
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
            value={name}
            onChange={handleNameChange}
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
            value={imageUrl}
            onChange={handleUrlChange}
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
              onChange={handleWeatherChange}
            />
            <label htmlFor="hot"> Hot</label>
          </div>
          <div>
            <input
              name="weather"
              type="radio"
              id="warm"
              value="warm"
              onChange={handleWeatherChange}
            />
            <label htmlFor="warm"> Warm</label>
          </div>
          <div>
            <input
              name="weather"
              type="radio"
              id="cold"
              value="cold"
              onChange={handleWeatherChange}
            />
            <label htmlFor="cold"> Cold</label>
          </div>
        </div>
      </div>
    </ModalWithForm>
  );
};

export default AddItemModal;

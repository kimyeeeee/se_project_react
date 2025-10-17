import React, { useState, useEffect } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useForm } from "../../hooks/useForm";
import { Link } from "react-router-dom";

const RegisterModal = ({
  handleCloseModal,
  isOpen,
  handleRegistration,
  handleSwitchToLogin,
}) => {
  const [data, setData] = useState({
    email: "",
    password: "",
    name: "",
    avatar: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleRegistration(data);
  };

  const isFormValid = data.email && data.password && data.name;

  return (
    <ModalWithForm
      className="modal-with-form"
      title="Sign Up"
      onClose={handleCloseModal}
      isOpen={isOpen}
      onSubmit={handleSubmit}
      disabled={!isFormValid}
      // buttonText="Next"
    >
      <div className="form__input-title-container">
        <label htmlFor="email" className="input-title">
          Email*
          <input
            className="input-box"
            type="email"
            name="email"
            minLength="1"
            maxLength="30"
            placeholder="Email"
            id="email"
            value={data.email}
            onChange={handleChange}
            required
          />
        </label>
      </div>
      <div className="form__input-title-container">
        <label htmlFor="password" className="input-title">
          Password*
          <input
            className="input-box"
            type="password"
            name="password"
            minLength="5"
            maxLength="999"
            placeholder="Password"
            id="password"
            value={data.password}
            onChange={handleChange}
            required
          />
        </label>
      </div>
      <div className="form__input-title-container">
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
            value={data.name}
            onChange={handleChange}
          />
        </label>
      </div>
      <div className="form__input-title-container">
        <label htmlFor="url" className="input-title">
          Avatar URL
          <input
            className="input-box"
            type="url"
            name="avatar"
            minLength="1"
            maxLength="999"
            placeholder="Image URL"
            id="url"
            value={data.avatar}
            onChange={handleChange}
          />
        </label>
      </div>
      <div className="modal__button-container">
        <button
          type="submit"
          className="modal__submit-button"
          disabled={!isFormValid}
        >
          Next
        </button>
        <button
          type="button"
          onClick={handleSwitchToLogin}
          className="modal__switch-button"
        >
          or Login
        </button>
      </div>
    </ModalWithForm>
  );
};

export default RegisterModal;

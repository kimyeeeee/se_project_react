// import "./RegisterModal.css";
import React, { useState, useEffect } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useForm } from "../../hooks/useForm";
import { Link } from "react-router-dom";

const RegisterModal = ({
  handleCloseModal,
  isOpen,
  handleRegistration,
  buttonText = "Next",
}) => {
  const { values, handleChange, setValues } = useForm({});

  const handleSubmit = (e) => {
    e.preventDefault();
    handleRegistration(values);
  };

  // const Register = ({ handleRegistration }) => {
  //   const [data, setData] = useState({
  //     username: "",
  //     email: "",
  //     password: "",
  //     confirmPassword: "",
  //   });

  return (
    <ModalWithForm
      className="modal-with-form"
      title="Sign Up"
      onClose={handleCloseModal}
      isOpen={isOpen}
      onSubmit={handleSubmit}
    >
      <div className="form__name-container">
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
            value={values.name || ""}
            onChange={handleChange}
            required
          />
        </label>
      </div>
      <div className="form__image-container">
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
            value={values.imageUrl || ""}
            onChange={handleChange}
            required
          />
        </label>
      </div>
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
            required
          />
        </label>
      </div>
      <div className="form__image-container">
        <label htmlFor="url" className="input-title">
          Avatar URL
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
      <div className="modal__or-Container">
        <Link to="/login" className="modal__or-link">
          or Login
        </Link>
      </div>
    </ModalWithForm>
  );
};

export default RegisterModal;

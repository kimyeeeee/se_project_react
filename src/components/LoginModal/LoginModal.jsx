import { Link } from "react-router-dom";
import { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useForm } from "../../hooks/useForm";

const LoginModal = ({
  handleLogin,
  isOpen,
  handleCloseModal,
  handleSwitchToRegister,
}) => {
  const [data, setData] = useState({
    email: "",
    password: "",
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
    handleLogin(data);
  };

  return (
    <ModalWithForm
      className="modal-with-login-form"
      title="Log in"
      onClose={handleCloseModal}
      isOpen={isOpen}
      onSubmit={handleSubmit}
      // buttonText="Log In"
    >
      <div className="form__input-title-container">
        <label htmlFor="email" className="input-title">
          Email:
          <input
            className="input-box"
            id="email"
            required
            name="email"
            type="email"
            placeholder="Email"
            value={data.email}
            onChange={handleChange}
          />
        </label>
      </div>

      <div className="form__input-title-container">
        <label htmlFor="password" className="input-title">
          Password:
          <input
            className="input-box"
            id="password"
            required
            name="password"
            type="password"
            placeholder="Password"
            value={data.password}
            onChange={handleChange}
          />
        </label>
      </div>

      <div className="modal__button-container">
        <button type="submit" className="modal__submit-button">
          Log in
        </button>
        <button
          type="button"
          className="modal__or-link"
          onClick={handleSwitchToRegister}
        >
          or Register
        </button>
      </div>
    </ModalWithForm>
  );
};

export default LoginModal;

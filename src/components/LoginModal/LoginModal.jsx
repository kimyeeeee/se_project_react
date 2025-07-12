import { Link } from "react-router-dom";
import { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useForm } from "../../hooks/useForm";

const LoginModal = ({
  handleLogin,
  isOpen,
  handleCloseModal,
  buttonText = "Log In",
}) => {
  const [data, setData] = useState({
    username: "",
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
      className="modal-with-form"
      title="Login-Modal"
      onClose={handleCloseModal}
      isOpen={isOpen}
      onSubmit={handleSubmit}
    >
      <div className="form__name-container">
        <p className="login__welcome">Log In</p>
        <label htmlFor="email" className="input-title">
          Email:
        </label>
        <input
          className="input-box"
          id="email"
          required
          name="email"
          type="email"
          value={data.username}
          onChange={handleChange}
        />
        <label htmlFor="password" className="input-title">
          Password:
        </label>
        <input
          className="input-box"
          id="password"
          required
          name="password"
          type="password"
          value={data.password}
          onChange={handleChange}
        />
        <div className="login__button-container">
          <button type="submit" className="modal__add-garment-button">
            Log in
          </button>
        </div>

        <div className="login__signup">
          <Link to="/register" className="signup__link">
            or Register
          </Link>
        </div>
      </div>
    </ModalWithForm>
  );
};

export default LoginModal;

import "./Header.css";
import avatarUrl from "../../images/avatar.png";
import wtwrLogo from "../../images/wtwrLogo.svg";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import React, { useContext } from "react";
import { Link } from "react-router-dom";

const Header = ({
  onCreateModal,
  isLoggedIn,
  temp,
  onOpenRegisterModal,
  onOpenLoginModal,
}) => {
  return (
    <header className="header">
      <div className="header__logo">
        <div>
          <Link to="/">
            <img src={wtwrLogo} alt="wtwr-logo" />
          </Link>
        </div>
        <div>Date</div>
      </div>
      <div className="header__avatar-logo">
        <ToggleSwitch />
      </div>
      <div className="header__user-log-in">
        {isLoggedIn ? (
          <div>
            <button
              className="header__add-clothes-button"
              type="text"
              onClick={onCreateModal}
            >
              + Add Clothes
            </button>
            <Link to="/profile">Terrence Tegegne</Link>
            <img src={avatarUrl} alt="avatar-logo" />
          </div>
        ) : (
          <div>
            <button
              className="header__sign-up-button"
              type="text"
              onClick={onOpenRegisterModal}
            >
              Sign Up
            </button>
            <button
              className="header__log-in-button"
              type="text"
              onClick={onOpenLoginModal}
            >
              Log In
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;

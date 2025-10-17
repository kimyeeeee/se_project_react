import "./Header.css";

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
  const currentUser = useContext(CurrentUserContext);
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const today = new Date();
  const currentDate = `${monthNames[today.getMonth()]} ${today.getDate()}`;

  return (
    <header className="header">
      <div className="header__logo">
        <div>
          <Link to="/">
            <img src={wtwrLogo} alt="wtwr-logo" />
          </Link>
        </div>
        <div>{currentDate}</div>
      </div>

      <div className="header__user-logged-in">
        <div className="header__toggle-switch">
          <ToggleSwitch />
        </div>
        {isLoggedIn ? (
          <div className="header__user-logged-in">
            <button
              className="header__add-clothes-button"
              type="text"
              onClick={onCreateModal}
            >
              + Add Clothes
            </button>
            <Link to="/profile">{currentUser?.name}</Link>
            {currentUser?.avatar ? (
              <img
                className="header__avatar-img"
                src={currentUser.avatar}
                alt="avatar-logo"
                onError={(e) => {
                  //handle error here
                  console.log("Image failed to load");
                }}
              />
            ) : (
              <div className="header__avatar-placeholder">
                {currentUser?.name?.[0]?.toUpperCase()}
              </div>
            )}
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

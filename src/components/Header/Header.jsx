import "./Header.css";
import avatarUrl from "../../images/avatar.png";
import wtwrLogo from "../../images/wtwrLogo.svg";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";

import { Link } from "react-router-dom";

// If not logged in show what you have
// if log in show different html

const Header = ({ onCreateModal }) => {
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
        <div>
          <button
            className="header__add-clothes-button"
            type="text"
            onClick={onCreateModal}
          >
            + Add Clothes
          </button>
        </div>
        <Link to="/profile">Terrence Tegegne</Link>
        <div>
          <img src={avatarUrl} alt="avatar-logo" />
        </div>
      </div>
    </header>
  );
};

export default Header;

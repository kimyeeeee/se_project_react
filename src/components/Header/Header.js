import "./Header.css";
import avatarUrl from "../../images/avatar.png";
import wtwrLogo from "../../images/wtwrLogo.svg";

const Header = ({ onCreateModal }) => {
  return (
    <header className="header">
      <div className="header__logo">
        <div>
          <img src={wtwrLogo} alt="wtwr-logo" />
        </div>
        <div>Date</div>
      </div>
      <div className="header__avatar-logo">
        <div>
          <button type="text" onClick={onCreateModal}>
            + New Clothes
          </button>
        </div>
        <div>Terrence Tegegne</div>
        <div>
          <img src={avatarUrl} alt="avatar-pic" />
        </div>
      </div>
    </header>
  );
};

export default Header;

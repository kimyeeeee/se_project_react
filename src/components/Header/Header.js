import "./Header.css";
import avatarUrl from "../../images/avatar.png";

const Header = ({ onCreateModal }) => {
  return (
    <header className="header">
      <div className="header__logo">
        <div>
          <img src={require("../../images/wtwrLogo.svg").default} alt="logo" />
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
          <img src={avatarUrl} alt="logo" />
        </div>
      </div>
    </header>
  );
};

export default Header;

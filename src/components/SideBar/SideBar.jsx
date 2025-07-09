import "./SideBar.css";
import avatarUrl from "../../images/avatar.png";

const SideBar = ({}) => {
  return (
    <div className="sidebar__container">
      <div className="sidebar">
        <img
          src={avatarUrl}
          alt="avatar-logo"
          className="sidebar__avatar-logo"
        />
        <h3 className="sidebar__username">Terrence Tegegne</h3>
      </div>
    </div>
  );
};

export default SideBar;

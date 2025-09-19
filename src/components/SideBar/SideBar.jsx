import { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { Link } from "react-router-dom";
import "./SideBar.css";

const SideBar = ({ handleLogOut, handleEditProfile }) => {
  const currentUser = useContext(CurrentUserContext);
  // console.log("Current user in SideBar:", currentUser);
  // console.log("Avatar value:", currentUser?.avatar);
  return (
    <div className="sidebar__container">
      <div className="sidebar">
        {currentUser?.avatar ? (
          <img
            src={currentUser.avatar}
            alt="avatar-logo"
            className="sidebar__avatar-logo"
          />
        ) : (
          <div className="sidebar__avatar-placeholder">
            {currentUser?.name?.[0]?.toUpperCase()}
          </div>
        )}
        <h3 className="sidebar__username">{currentUser?.name || "User"}</h3>
      </div>
      <div>
        <button
          className="sidebar__change-profile-data-button"
          type="button"
          // onClick={handleOpenEditProfileModal}
          onClick={() => {
            console.log("Edit profile button clicked!");
            handleEditProfile();
          }}
        >
          Change profile data
        </button>
      </div>
      <div>
        <button
          className="sidebar__log-out-button"
          type="button"
          onClick={handleLogOut}
        >
          Log Out
        </button>
      </div>
    </div>
  );
};

export default SideBar;

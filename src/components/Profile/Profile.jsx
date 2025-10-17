import React from "react";
import SideBar from "../SideBar/SideBar";
import ClothesSection from "../ClothesSection/ClothesSection";
import "./Profile.css";

const Profile = ({
  clothingItems,
  onSelectCard,
  handleCreateModal,
  onOpenEditProfileModal,
  onLogOut,
  onCardLike,
}) => {
  return (
    <div className="profile">
      <SideBar
        handleEditProfile={onOpenEditProfileModal}
        handleLogOut={onLogOut}
      />
      <ClothesSection
        onSelectCard={onSelectCard}
        clothingItems={clothingItems}
        onCreateModal={handleCreateModal}
        onCardLike={onCardLike}
      />
    </div>
  );
};

export default Profile;

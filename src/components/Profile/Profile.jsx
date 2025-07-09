import React from "react";
import SideBar from "../SideBar/SideBar";
import ClothesSection from "../ClothesSection/ClothesSection";
import "./Profile.css";

const Profile = ({ clothingItems, onSelectCard, handleCreateModal }) => {
  return (
    <div className="profile">
      <SideBar />
      <ClothesSection
        onSelectCard={onSelectCard}
        clothingItems={clothingItems}
        onCreateModal={handleCreateModal}
      />
    </div>
  );
};

export default Profile;

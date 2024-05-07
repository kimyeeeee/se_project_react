import SideBar from "../SideBar/SideBar";
import ClothesSection from "../ClothesSection/ClothesSection";
import "./Profile.css";

const Profile = ({ clothingItems }) => {
  return (
    <div className="profile">
      <SideBar></SideBar>
      <ClothesSection onSelectCard={onSelectCard}></ClothesSection>
    </div>
  );
};

export default Profile;

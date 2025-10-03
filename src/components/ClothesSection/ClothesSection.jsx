import "./ClothesSection.css";
import ItemCard from "../ItemCard/ItemCard";
import { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

const ClothesSection = ({ clothingItems, onSelectCard, onCreateModal }) => {
  const currentUser = useContext(CurrentUserContext);
  const userItems = clothingItems.filter((item) => {
    return item.owner === currentUser._id;
  });
  return (
    <section className="clothes_section">
      <div className="clothes_section__container">
        <p className="clothes_section__title">Your Items:</p>

        <button
          className="clothes_section__button"
          type="button"
          onClick={onCreateModal}
        >
          + Add New
        </button>
      </div>
      <div className="clothes_section__cards">
        {userItems.map((item) => {
          return (
            <ItemCard
              item={item}
              onSelectCard={onSelectCard}
              key={item._id}
            ></ItemCard>
          );
        })}
      </div>
    </section>
  );
};
export default ClothesSection;

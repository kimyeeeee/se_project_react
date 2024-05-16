import "./ClothesSection.css";
import ItemCard from "../ItemCard/ItemCard";
import { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext.js";

const ClothesSection = ({ clothingItems, onSelectCard, onCreateModal }) => {
  const { currentUser } = useContext(CurrentUserContext);
  const filteredCards = clothingItems.filter((item) => {
    return currentUser._id === currentUser._id;
  });

  return (
    <section className="clothes_section">
      <div className="clothes_section__container">
        <p className="clothes_section__title">Your Items:</p>
        <button
          className="clothes_section__button"
          type="text"
          onClick={onCreateModal}
        >
          + Add New
        </button>
      </div>
      <div className="clothes_section__cards">
        {filteredCards.map((item) => {
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

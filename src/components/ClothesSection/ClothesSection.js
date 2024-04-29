import "./ClothesSection.css";
import ItemCard from "../ItemCard/ItemCard";

const ClothesSection = ({ clothingItems }) => {
  // const filteredCards = clothingItems.filter((item) => return
  //**all cards**
  // );

  return (
    <section className="clothes_section">
      <div className="clothes_section__container">
        <p className="clothes_section__title">Your Items:</p>
        <button className="clothes_section__button" type="text">
          + Add New
        </button>
      </div>
      <div className="clothes_section__cards">
        {filteredCards.map((item) => {
          return <ItemCard></ItemCard>;
        })}
      </div>
    </section>
  );
};
export default ClothesSection;

import "./ItemCard.css";

const ItemCard = ({ item, onSelectCard }) => {
  return (
    <div className="card_container">
      <div>
        <img
          className="card_image"
          src={item.link}
          onClick={() => onSelectCard(item)}
          alt="clothing-card"
        />
      </div>
      <p className="card_name">{item.name}</p>
    </div>
  );
};

export default ItemCard;

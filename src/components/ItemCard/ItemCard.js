import "./ItemCard.css";

const ItemCard = ({ item, onSelectCard }) => {
  return (
    <div className="card_container">
      <div>
        <img
          className="card_image"
          src={item.link}
          onClick={() => onSelectCard(item)}
          alt="pic-of-clothing"
        />
      </div>
      <div className="card_name">{item.name}</div>
    </div>
  );
};

export default ItemCard;

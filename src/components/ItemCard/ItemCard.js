import "./ItemCard.css";
import React, { useContext, useEffect } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

const ItemCard = ({ item, onSelectCard }) => {
  const { currentUser } = useContext(CurrentUserContext);
  return (
    <div className="card_container">
      <div>
        <img
          className="card_image"
          src={item.imageUrl}
          onClick={() => onSelectCard(item)}
          alt={item.name}
        />
      </div>
      <p className="card_name">{item.name}</p>
    </div>
  );
};

export default ItemCard;

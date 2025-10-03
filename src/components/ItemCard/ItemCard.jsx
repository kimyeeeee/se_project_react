import { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import "./ItemCard.css";
import React from "react";

const ItemCard = ({ item, onSelectCard, onCardLike, isLoggedIn }) => {
  const currentUser = useContext(CurrentUserContext);
  console.log("isLoggedIn:", isLoggedIn);
  console.log("currentUser:", currentUser);

  const isLiked = item.likes.some((id) => id === currentUser._id);
  const handleLike = () => {
    console.log("onCardLike type:", typeof onCardLike);
    console.log("onCardLike value:", onCardLike);
    onCardLike({ id: item._id, isLiked });
  };
  const itemLikeButtonClassName = `card_like ${
    isLiked ? "card_like_active" : ""
  }`;

  return (
    <div className="card_container">
      <div className="card_name-container">
        <h2 className="card_name">{item.name}</h2>
        {currentUser ? (
          isLiked ? (
            <button className={itemLikeButtonClassName} onClick={handleLike}>
              ♥
            </button>
          ) : (
            <button className={itemLikeButtonClassName} onClick={handleLike}>
              ♡
            </button>
          )
        ) : null}
      </div>
      <img
        className="card_image"
        src={item.imageUrl}
        onClick={() => onSelectCard(item)}
        alt={item.name}
      />
    </div>
  );
};

export default ItemCard;

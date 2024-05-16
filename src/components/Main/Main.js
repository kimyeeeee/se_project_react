// import { defaultClothingItems } from "../../utils/constants";
import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";
import { useMemo, useContext } from "react";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";
import "./Main.css";

function Main({ weatherTemp, onSelectCard, clothingItems }) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);

  const temp = weatherTemp?.temperature?.[currentTemperatureUnit] || 999;
  const weatherType = useMemo(() => {
    if (
      (currentTemperatureUnit === "F" && temp >= 86) ||
      (currentTemperatureUnit === "C" && temp >= 30)
    ) {
      return "hot";
    } else if (
      (currentTemperatureUnit === "F" && temp >= 66 && temp <= 8) ||
      (currentTemperatureUnit === "C" && temp >= 19 && temp <= 29)
    ) {
      return "warm";
    } else if (
      (currentTemperatureUnit === "F" && temp <= 65) ||
      (currentTemperatureUnit === "C" && temp <= 18)
    ) {
      return "cold";
    }
  }, [weatherTemp]);

  const filteredCards = clothingItems.filter((item) => {
    return item.weather.toLowerCase() === weatherType;
  });

  const weatherCelsiumType = useMemo(() => {
    if (temp >= 30) {
      return "hot";
    } else if (temp >= 66 && temp <= 85) {
      return "warm";
    } else if (temp <= 65) {
      return "cold";
    }
  }, [weatherTemp]);

  return (
    <main className="main">
      <WeatherCard day={true} type="storm" weatherTemp={temp} />
      <section className="card_section" id="card-section">
        Today is {temp + "° " + currentTemperatureUnit}/ You may want to wear:
        <div className="card_items">
          {filteredCards.map((item) => (
            <ItemCard item={item} onSelectCard={onSelectCard} key={item._id} />
          ))}
        </div>
      </section>
    </main>
  );
}

export default Main;

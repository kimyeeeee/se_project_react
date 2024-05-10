import "./WeatherCard.css";
import { weatherConditions } from "../../utils/constants";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";
import { useContext } from "react";

const WeatherCard = ({ day, type, weatherTemp = 0 }) => {
  const { CurrentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);

  const imageSrc = weatherConditions.filter((i) => {
    return i.day === day && i.type === type;
  });
  //   console.log(imageSrc);
  //   console.log(imageSrc[0].url);

  const imageSrcUrl = imageSrc[0].url || "";
  return (
    <section className="weather" id="weather">
      <div className="weather_info">
        {weatherTemp + "° " + CurrentTemperatureUnit}
      </div>
      <img src={imageSrcUrl} className="weather_image" alt="weather-bar" />
    </section>
  );
};

export default WeatherCard;

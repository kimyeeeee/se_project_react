import "./WeatherCard.css";
import { weatherConditions } from "../../utils/constants";

const WeatherCard = ({ day, type, weatherTemp = "" }) => {
  const imageSrc = weatherConditions.filter((i) => {
    // console.log(i);
    return i.day === day && i.type === type;
  });
  //   console.log(imageSrc);
  //   console.log(imageSrc[0].url);

  const imageSrcUrl = imageSrc[0].url || "";
  return (
    <section className="weather" id="weather">
      <div className="weather_info">{weatherTemp}°F</div>
      <img src={imageSrcUrl} className="weather_image" alt="weather-bar" />
    </section>
  );
};

export default WeatherCard;

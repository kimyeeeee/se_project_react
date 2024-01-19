const weatherConditions = [
  {
    url: require("../../images/weatherConditions/sunny.svg").default,
    day: true,
    type: "sunny",
  },
  {
    url: require("../../images/weatherConditions/cloudy.svg").default,
    day: true,
    type: "cloudy",
  },
  {
    url: require("../../images/weatherConditions/fog.svg").default,
    day: true,
    type: "fog",
  },
  {
    url: require("../../images/weatherConditions/rain.svg").default,
    day: true,
    type: "rain",
  },
  {
    url: require("../../images/weatherConditions/snow.svg").default,
    day: true,
    type: "snow",
  },
  {
    url: require("../../images/weatherConditions/storm.svg").default,
    day: true,
    type: "storm",
  },
  {
    url: require("../../images/weatherConditions/night-cloudy.svg").default,
    day: false,
    type: "night-cloudy",
  },
  {
    url: require("../../images/weatherConditions/night-fog.svg").default,
    day: false,
    type: "night-fog",
  },
  {
    url: require("../../images/weatherConditions/night-rain.svg").default,
    day: false,
    type: "night-rain",
  },
  {
    url: require("../../images/weatherConditions/night-snow.svg").default,
    day: false,
    type: "night-snow",
  },
  {
    url: require("../../images/weatherConditions/night-storm.svg").default,
    day: false,
    type: "night-storm",
  },
  {
    url: require("../../images/weatherConditions/night-sunny.svg").default,
    day: false,
    type: "night-sunny",
  },
];

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
      <img src={imageSrcUrl} className="weather_image" />
    </section>
  );
};

export default WeatherCard;

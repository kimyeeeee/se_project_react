import { checkServerResponse } from "./api";
const latitude = 44.34;
const longitude = 10.99;
const APIkey = "3ff84946da9ffde2797a3d0f34f4825c";

export const getForecastWeather = () => {
  const weatherApi = fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${APIkey}`
  ).then(checkServerResponse);

  return weatherApi;
};

export const parseWeatherData = (data) => {
  const main = data.main;
  const temperature = main && main.temp;

  const weather = {
    temperature: {
      F: Math.round(temperature),
      C: Math.round(((temperature - 32) * 5) / 9),
    },
  };

  return weather;
};

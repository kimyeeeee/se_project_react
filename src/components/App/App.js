import logo from "../../logo.svg";
import "./App.css";
import Header from "../Header/Header.js";
import Main from "../Main/Main.js";
import defaultClothingItems from "../../utils/constants.js";
import Footer from "../Footer/Footer.js";
import ModalWithForm from "../ModalWithForm/ModalWithForm.js";
import { useState, useEffect } from "react";
import ItemModal from "../ItemModal/ItemModal.js";
import {
  getForecastWeather,
  parseWeatherData,
} from "../../utils/weatherApi.js";

function App() {
  const weatherTemp = "30";
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [temp, setTemp] = useState(0);

  const handleCreateModal = () => {
    setActiveModal("create");
  };

  const handleCloseModal = () => {
    setActiveModal("");
  };

  const handleSelectedCard = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  useEffect(() => {
    getForecastWeather()
      .then((data) => {
        const temperature = parseWeatherData(data);

        setTemp(temperature);
      })
      .catch((err) => {
        console.error("Error. The request failed");
      });
  }, []);

  return (
    <div>
      <Header onCreateModal={handleCreateModal} />
      <Main weatherTemp={temp} onSelectCard={handleSelectedCard} temp={temp} />
      <Footer />
      {activeModal === "create" && (
        <ModalWithForm
          className="modal-with-form"
          title="New Garment"
          onClose={handleCloseModal}
        >
          <div className="form__name-container">
            <label htmlFor="name" className="input-title">
              Name
              <input
                className="input-box"
                type="text"
                name="name"
                minLength="1"
                maxLength="30"
                placeholder="Name"
                id="name"
              />
            </label>
          </div>
          <div className="form__image-container">
            <label htmlFor="url" className="input-title">
              Image
              <input
                className="input-box"
                type="url"
                name="link"
                minLength="1"
                maxLength="30"
                placeholder="Image URL"
                id="url"
              />
            </label>
          </div>
          <div className="form__weather-container">
            <p>Select the weather type:</p>
            <div>
              <div>
                <input name="weather" type="radio" id="hot" value="hot" />
                <label htmlFor="hot"> Hot</label>
              </div>
              <div>
                <input name="weather" type="radio" id="warm" value="warm" />
                <label htmlFor="warm"> Warm</label>
              </div>
              <div>
                <input name="weather" type="radio" id="cold" value="cold" />
                <label htmlFor="cold"> Cold</label>
              </div>
            </div>
          </div>
        </ModalWithForm>
      )}
      {activeModal === "preview" && (
        <ItemModal selectedCard={selectedCard} onClose={handleCloseModal} />
      )}
    </div>
  );
}

export default App;

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
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext.js";
import { Switch, Route } from "react-router-dom/cjs/react-router-dom.min.js";
import AddItemModal from "../AddItemModal/AddItemModal.js";
import ItemCard from "../ItemCard/ItemCard.js";
import { deleteItems, getItems, postItems } from "../../utils/api.js";
import Profile from "../Profile/Profile.js";

function App() {
  const weatherTemp = "30";
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [temp, setTemp] = useState(0);
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [clothingItems, setClothingItems] = useState([]);
  console.log("clothingItems", clothingItems);

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

  const handleToggleSwitchChange = () => {
    if (currentTemperatureUnit === "C") setCurrentTemperatureUnit("F");
    if (currentTemperatureUnit === "F") setCurrentTemperatureUnit("C");
  };

  const handleAddItemSubmit = ({ name, imageUrl, weather }) => {
    return postItems({ name, imageUrl, weather }).then((res) => {
      setClothingItems([res, ...clothingItems]);
    });
  };

  const handleDeleteCard = (card) => {
    deleteItems(selectedCard._id)
      .then(() => {
        const filteredCards = clothingItems.filter((card) => {
          return card._id !== selectedCard._id;
        });
        setClothingItems(filteredCards);
        handleCloseModal();
      })
      .catch((err) => {
        console.error("Error. The request failed");
      });
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

  useEffect(() => {
    getItems()
      .then((cards) => {
        console.log("cards", cards);
        setClothingItems(cards);
      })
      .catch((err) => {
        console.error("Error. The request failed");
      });
  }, []);

  return (
    <div>
      <CurrentTemperatureUnitContext.Provider
        value={{ currentTemperatureUnit, handleToggleSwitchChange }}
      >
        <Header onCreateModal={handleCreateModal} temp={temp} />
        <Switch>
          <Route exact path="/">
            <Main
              weatherTemp={temp}
              onSelectCard={handleSelectedCard}
              clothingItems={clothingItems}
            />
          </Route>
          <Route path="/Profile">
            <Profile></Profile>
          </Route>
        </Switch>
        <Footer />
        {activeModal === "create" && (
          <AddItemModal
            handleCloseModal={handleCloseModal}
            isOpen={activeModal === "create"}
            onAddItem={handleAddItemSubmit}
            // onSubmit={handleAddItemSubmit}
          />
        )}
        {activeModal === "preview" && (
          <ItemModal
            selectedCard={selectedCard}
            onClose={handleCloseModal}
            handleDeleteCard={handleDeleteCard}
          />
        )}
      </CurrentTemperatureUnitContext.Provider>
    </div>
  );
}

export default App;

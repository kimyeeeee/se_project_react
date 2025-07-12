import logo from "../../logo.svg";
import "./App.css";
import Header from "../Header/Header.jsx";
import Main from "../Main/Main.jsx";
// import defaultClothingItems from "../../utils/constants.js";
import Footer from "../Footer/Footer.jsx";
import ModalWithForm from "../ModalWithForm/ModalWithForm.jsx";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import ItemModal from "../ItemModal/ItemModal.jsx";
import {
  getForecastWeather,
  parseWeatherData,
} from "../../utils/weatherApi.js";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext.js";
// import { Switch, Route } from "react-router-dom/cjs/react-router-dom.min.js";
import { Route, Routes } from "react-router-dom";
import AddItemModal from "../AddItemModal/AddItemModal.jsx";
import ItemCard from "../ItemCard/ItemCard.jsx";
import { deleteItems, getItems, postItems } from "../../utils/api.js";
import Profile from "../Profile/Profile.jsx";
import RegisterModal from "../RegisterModal/RegisterModal.jsx";
import ProtectedRoute from "../ProtectedRoute.jsx";
import { setToken, getToken } from "../../utils/token.js";
import * as auth from "../../utils/auth.js";
import * as api from "../../utils/api.js";
import LoginModal from "../LoginModal/LoginModal.jsx";
import AppContext from "../../contexts/AppContext.js";

function App() {
  const weatherTemp = "30";
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [temp, setTemp] = useState(0);
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [clothingItems, setClothingItems] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState({});
  const navigate = useNavigate();
  const location = useLocation();

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
    return postItems({ name, imageUrl, weather })
      .then((res) => {
        setClothingItems([res, ...clothingItems]);
        handleCloseModal();
      })
      .catch((error) => {
        console.log("Error. The request failed");
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

  const handleRegistration = ({ name, email, password, confirmPassword }) => {
    console.log("in handleRegistration");
    if (password === confirmPassword) {
      auth
        .register(name, password, email)
        .then(() => {
          navigate("/login");
        })
        .catch(console.error);
    }
  };

  const handleLogin = ({ username, password }) => {
    if (!username || !password) {
      return;
    }
    auth
      .authorize(username, password)
      .then((data) => {
        if (data.jwt) {
          setToken(data.jwt);
          setUserData(data.user);
          setIsLoggedIn(true);
          const redirectPath = location.state?.from?.pathname || "/Profile";
          navigate(redirectPath);
        }
      })
      .catch(console.error);
  };

  useEffect(() => {
    const jwt = getToken();

    if (!jwt) {
      return;
    }
    api
      .getUserInfo(jwt)
      .then(({ username, email }) => {
        setIsLoggedIn(true);
        setUserData({ username, email });
      })
      .catch(console.error);
  }, []);

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
    <AppContext.Provider value={{ isLoggedIn, userData }}>
      <CurrentTemperatureUnitContext.Provider
        value={{ currentTemperatureUnit, handleToggleSwitchChange }}
      >
        <Header
          onCreateModal={handleCreateModal}
          temp={temp}
          isLogged={isLoggedIn}
        />
        <Routes>
          <Route
            path="/"
            element={
              <Main
                weatherTemp={temp}
                onSelectCard={handleSelectedCard}
                clothingItems={clothingItems}
              />
            }
          />

          <Route
            path="/Profile"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <Profile
                  onSelectCard={handleSelectedCard}
                  clothingItems={clothingItems}
                  handleCreateModal={handleCreateModal}
                />
              </ProtectedRoute>
            }
          />
          <Route
            path="/register"
            element={
              <div className="registerContainer">
                <RegisterModal handleRegistration={handleRegistration} />
              </div>
            }
          />
          <Route
            path="/login"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn} anonymous>
                <div className="loginContainer">
                  <LoginModal handleLogin={handleLogin} />
                </div>
              </ProtectedRoute>
            }
          />
        </Routes>
        <Footer />
        {activeModal === "create" && (
          <AddItemModal
            handleCloseModal={handleCloseModal}
            isOpen={activeModal === "create"}
            onAddItem={handleAddItemSubmit}
          />
        )}
        {activeModal === "preview" && (
          <ItemModal
            selectedCard={selectedCard}
            onClose={handleCloseModal}
            handleDeleteCard={handleDeleteCard}
          />
        )}
        {activeModal === "register" && (
          <RegisterModal
            handleCloseModal={handleCloseModal}
            isOpen={activeModal === "register"}
            handleRegistration={handleRegistration}
          />
        )}
        {activeModal === "log-in" && (
          <LoginModal
            handleCloseModal={handleCloseModal}
            isOpen={activeModal === "log-in"}
            //something about log in
          />
        )}
      </CurrentTemperatureUnitContext.Provider>
    </AppContext.Provider>
  );
}

export default App;

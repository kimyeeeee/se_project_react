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
import {
  deleteItems,
  getItems,
  postItems,
  getUserInfo,
} from "../../utils/api.js";
import Profile from "../Profile/Profile.jsx";
import RegisterModal from "../RegisterModal/RegisterModal.jsx";
import ProtectedRoute from "../ProtectedRoute.jsx";
import { setToken, getToken } from "../../utils/token.js";
import * as auth from "../../utils/auth.js";
import * as api from "../../utils/api.js";
import LoginModal from "../LoginModal/LoginModal.jsx";
import AppContext from "../../contexts/AppContext.js";
import { CurrentUserContext } from "../../contexts/CurrentUserContext.js";
import { checkToken } from "../../utils/auth.js";

function App() {
  const weatherTemp = "30";
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [temp, setTemp] = useState(0);
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [clothingItems, setClothingItems] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // const [userData, setUserData] = useState({});
  const navigate = useNavigate();
  const location = useLocation();
  const [currentUser, setCurrentUser] = useState({});
  const [isAddItemModalOpen, setIsAddItemModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

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

  const handleOpenRegisterModal = () => setActiveModal("register");
  const handleOpenLoginModal = () => setActiveModal("login");

  const handleRegistration = ({ email, password, name, avatarURL }) => {
    console.log("in handleRegistration");

    auth
      .register(name, password, email, avatarURL)
      .then((data) => {
        console.log("Registered user:", data);
        return auth.authorize(email, password);
      })
      .then((loginData) => {
        console.log("logged in", loginData);
        if (loginData.token) {
          setToken(loginData.token);
          setCurrentUser(loginData.user);
          setIsLoggedIn(true);
        }
        handleCloseModal();
        navigate("/Profile");
      })
      .catch((err) => {
        console.error(err);
        navigate("/signup");
      });
  };

  const handleLogin = ({ email, password }) => {
    console.log("in handleLogin");
    if (!email || !password) {
      return;
    }
    auth
      .authorize(email, password)
      .then((data) => {
        // console.log("API Response:", data);
        localStorage.setItem("jwt", data.token);
        if (data.token) {
          setToken(data.token);
          setCurrentUser(data.user);
          setIsLoggedIn(true);
          const redirectPath = location.state?.from?.pathname || "/Profile";
          navigate(redirectPath);
        }
      })
      .catch(console.error);
    navigate("/signin");
  };

  useEffect(() => {
    const jwt = getToken();

    if (!jwt) {
      return;
    }
    checkToken(jwt)
      .then(({ username, email }) => {
        setIsLoggedIn(true);
        setCurrentUser({ username, email });
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
    <AppContext.Provider value={{ isLoggedIn, currentUser }}>
      <CurrentTemperatureUnitContext.Provider
        value={{ currentTemperatureUnit, handleToggleSwitchChange }}
      >
        <CurrentUserContext.Provider value={currentUser}>
          <Header
            onCreateModal={handleCreateModal}
            temp={temp}
            isLoggedIn={isLoggedIn}
            onOpenRegisterModal={handleOpenRegisterModal}
            onOpenLoginModal={handleOpenLoginModal}
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
                  <RegisterModal
                    handleCloseModal={handleCloseModal}
                    handleRegistration={handleRegistration}
                  />
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
          {activeModal === "login" && (
            <LoginModal
              handleCloseModal={handleCloseModal}
              isOpen={activeModal === "login"}
              //something about log in
            />
          )}
        </CurrentUserContext.Provider>
      </CurrentTemperatureUnitContext.Provider>
    </AppContext.Provider>
  );
}

export default App;

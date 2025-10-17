import logo from "../../logo.svg";

import Header from "../Header/Header.jsx";
import Main from "../Main/Main.jsx";
// import defaultClothingItems from "../../utils/constants.js";
import Footer from "../Footer/Footer.jsx";
import ModalWithForm from "../ModalWithForm/ModalWithForm.jsx";
import { useState, useEffect, useContext } from "react";
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
import EditProfileModal from "../EditProfileModal/EditProfileModal.jsx";

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
  const [currentUser, setCurrentUser] = useState(null);
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
    const token = getToken();
    return postItems({ name, imageUrl, weather }, token)
      .then((res) => {
        setClothingItems([res, ...clothingItems]);
        handleCloseModal();
      })
      .catch((error) => {
        console.log("Error. The request failed");
      });
  };

  const handleDeleteCard = (card) => {
    const token = getToken();
    deleteItems(selectedCard._id, token)
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
  const handleOpenEditProfileModal = () => setActiveModal("edit");

  const handleRegistration = ({ name, avatar, email, password }) => {
    auth
      .register(name, avatar, email, password)
      .then((data) => {
        return auth.authorize(email, password);
      })
      .then((loginData) => {
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
      });
  };

  const handleLogin = ({ email, password }) => {
    if (!email || !password) {
      return;
    }
    auth
      .authorize(email, password)
      .then((data) => {
        localStorage.setItem("jwt", data.token);
        if (data.token) {
          setToken(data.token);
          checkToken(data.token)
            .then((user) => {
              setCurrentUser(user);
              setIsLoggedIn(true);
              const redirectPath = location.state?.from?.pathname || "/Profile";
              navigate(redirectPath);
              handleCloseModal();
            })
            .catch(console.error);
        }
      })
      .catch(console.error);
  };

  const handleEditProfile = ({ profileData }) => {
    const token = getToken();
    api
      .editProfile(profileData, token)
      .then((updatedUser) => {
        setCurrentUser(updatedUser);
        handleCloseModal();
      })
      .catch(console.error);
  };

  const handleCardLike = ({ id, isLiked }) => {
    const token = localStorage.getItem("jwt");

    !isLiked
      ? api
          .addCardLike(id, token)
          .then((updatedCard) => {
            setClothingItems((cards) =>
              cards.map((item) => (item._id === id ? updatedCard : item))
            );
          })
          .catch((err) => console.log(err))
      : api
          .removeCardLike(id, token)
          .then((updatedCard) => {
            setClothingItems((cards) =>
              cards.map((item) => (item._id === id ? updatedCard : item))
            );
          })
          .catch((err) => console.log(err));
  };

  const handleLogOut = () => {
    localStorage.removeItem("jwt");
    setCurrentUser(null);
    setIsLoggedIn(false);
    navigate("/");
  };

  const handleSwitchToLogin = () => {
    setActiveModal("login");
  };

  const handleSwitchToRegister = () => {
    setActiveModal("register");
  };

  useEffect(() => {
    const jwt = getToken();

    if (!jwt) {
      return;
    }
    checkToken(jwt)
      .then(({ name, email, avatar }) => {
        setIsLoggedIn(true);
        setCurrentUser({ name, email, avatar });
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
        setClothingItems(cards);
      })
      .catch((err) => {
        console.error("Error. The request failed");
      });
  }, []);

  return (
    <AppContext.Provider value={{ isLoggedIn, handleCloseModal }}>
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
                  onCardLike={handleCardLike}
                />
              }
            />

            <Route
              path="/profile"
              element={
                <ProtectedRoute isLoggedIn={isLoggedIn}>
                  <Profile
                    onSelectCard={handleSelectedCard}
                    clothingItems={clothingItems}
                    handleCreateModal={handleCreateModal}
                    onOpenEditProfileModal={handleOpenEditProfileModal}
                    onLogOut={handleLogOut}
                    onCardLike={handleCardLike}
                  />
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
              onCardLike={handleCardLike}
            />
          )}
          {activeModal === "register" && (
            <RegisterModal
              handleCloseModal={handleCloseModal}
              isOpen={activeModal === "register"}
              handleRegistration={handleRegistration}
              handleSwitchToLogin={handleSwitchToLogin}
            />
          )}
          {activeModal === "login" && (
            <LoginModal
              handleCloseModal={handleCloseModal}
              isOpen={activeModal === "login"}
              handleLogin={handleLogin}
              handleSwitchToRegister={handleSwitchToRegister}
            />
          )}
          {activeModal === "edit" && (
            <EditProfileModal
              handleCloseModal={handleCloseModal}
              isOpen={activeModal === "edit"}
              handleEditProfile={handleEditProfile}
            />
          )}
        </CurrentUserContext.Provider>
      </CurrentTemperatureUnitContext.Provider>
    </AppContext.Provider>
  );
}

export default App;

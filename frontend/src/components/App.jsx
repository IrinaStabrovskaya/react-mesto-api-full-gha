import "../index.css";
import Main from "./Main";
import Footer from "./Footer";
import PopupEditProfile from "./PopupWithForm/PopupEditProfile";
import PopupAddCard from "./PopupWithForm/PopupAddCard";
import PopupUpdateAvatar from "./PopupWithForm/PopupUpdateAvatar";
import PopupConfirm from "./PopupWithForm/PopupConfirm";
import ImagePopup from "./ImagePopup";
import { useState, useEffect } from "react";
import { api } from "./../utils/Api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import {
  Routes,
  Route,
  Navigate,
  useNavigate,
  useLocation,
} from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import ProtectedRoute from "./ProtectedRoute";
import InfoTooltip from "./InfoTooltip";
import * as mestoAuth from "../utils/mestoAuth";

const App = () => {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [isInfoTooltipOpen, setInfoTooltipOpen] = useState(false);

  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [errorRegister, setErrorRegister] = useState(false);
  const [user, setUser] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();
  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  };

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  };

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  };

  const handleCardClick = (cardData) => {
    setIsImagePopupOpen(true);
    setSelectedCard(cardData);
  };

  const closeAllPopups = () => {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsImagePopupOpen(false);
    setInfoTooltipOpen(false);
  };

  const handleCardLike = (card) => {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    api
      .changeLikeCardStatus(card.cardId, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card.cardId ? newCard : c))
        );
      })
      .catch((err) => console.log(err));
  };

  const handleCardDelete = (card) => {
    api
      .deleteCard(card.cardId)
      .then(() => {
        setCards((cards) => cards.filter((c) => c._id !== card.cardId));
      })
      .catch((err) => console.log(err));
  };

  const handleUpdateUser = (data) => {
    setIsLoading(true);
    return api
      .setInfo(data)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleUpdateAvatar = (avatar) => {
    setIsLoading(true);
    return api
      .setAvatar(avatar)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleAddNewCard = (data) => {
    setIsLoading(true);
    return api
      .setNewCard(data)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setIsLoading(false);
      });
  };

  const checkToken = () => {
    const token = localStorage.getItem("token");
    if (token) {
      mestoAuth
        .isValidToken(token)
        .then((data) => {
          if (data) {
            setIsLoggedIn(true);
            setUser(data.data.email);
            navigate(location.pathname);
          } else {
            setIsLoggedIn(false);
          }
        })
        .catch((err) => console.log(err));
    }
  };
  useEffect(() => {
    checkToken();
    // eslint-disable-next-line
  }, []);

  const handleRegister = (email, password) => {
    return mestoAuth
      .register({ email, password })
      .then((data) => {
        setUser(data.data.email);
        setIsLoggedIn(true);
        setErrorRegister(false);
        setInfoTooltipOpen(true);
        navigate("/sign-in", { replace: true });
      })
      .catch(() => {
        setIsLoggedIn(false);
        setErrorRegister(true);
        setInfoTooltipOpen(true);
      });
  };

  const handleAuthorization = (email, password) => {
    return mestoAuth
      .authorization({ email, password })
      .then((data) => {
        localStorage.setItem("token", data.token);
        setIsLoggedIn(true);
        navigate("/", { replace: true });
      })

      .catch(() => {
        setIsLoggedIn(false);
        setErrorRegister(true);
        setInfoTooltipOpen(true);
      });
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoading(true);
      api
        .getInfo()
        .then((data) => {
          setCurrentUser(data);
        })
        .catch(() => {
          setErrorRegister(true);
          setInfoTooltipOpen(true);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [isLoggedIn]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoading(true);
      api
        .getInitialsCards()
        .then((cards) => {
          setCards(cards);
        })
        .catch(() => {
          setErrorRegister(true);
          setInfoTooltipOpen(true);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [isLoggedIn]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Routes>
        <Route
          path="/sign-in"
          element={
            <Login onAuthorization={handleAuthorization} setUser={setUser} />
          }
        />
        <Route
          path="/sign-up"
          element={<Register onRegister={handleRegister} />}
        />
        <Route
          path="/"
          element={
            <ProtectedRoute
              element={Main}
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onEditAvatar={handleEditAvatarClick}
              onCardClick={handleCardClick}
              cards={cards}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDelete}
              isLoggedIn={isLoggedIn}
              user={user}
              setUser={setUser}
            />
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Footer />
      <PopupEditProfile
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        onUpdateUser={handleUpdateUser}
        isLoading={isLoading}
      />
      <PopupAddCard
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        onAddNewCard={handleAddNewCard}
        isLoading={isLoading}
      />
      <PopupUpdateAvatar
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        onUpdateAvatar={handleUpdateAvatar}
        isLoading={isLoading}
      />
      <PopupConfirm />
      <ImagePopup
        card={selectedCard}
        isOpen={isImagePopupOpen}
        onClose={closeAllPopups}
      />
      <InfoTooltip
        isOpen={isInfoTooltipOpen}
        onClose={closeAllPopups}
        errorRegister={errorRegister}
      />
    </CurrentUserContext.Provider>
  );
};

export default App;

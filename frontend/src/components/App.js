import { useEffect, useState, useCallback } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import vector from '../images/header/Vector.svg';
import CurrentUserContext from '../contexts/CurrentUserContext';
import api from '../utils/api';
import EditProfilePopup from './EditProfilePopup';
import ImagePopup from './ImagePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ProtectedRoute from './ProtectedRoute';
import Login from './Login';
import Register from './Register';
import InfoTooltip from './InfoTooltip';
import * as auth from '../utils/auth';

function App() {
  const [isEditProfilePopupOpen, setEditProfileOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlaceOpen] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarOpen] = useState(false);
  const [isImagePopupOpen, setIsImagePopuOpen] = useState(false);
  const [isToolTipOpen, setIsToolTipOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [isRegistered, setIsRegistered] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [jwt, setJWT] = useState(localStorage.getItem('jwt'));

  const [currentUser, setCurrentUser] = useState({});
  const [currentCards, setCurrentCards] = useState([]);

  const navigate = useNavigate();
  localStorage.getItem('email');

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogOut = () => {
    localStorage.removeItem('jwt');
    setJWT(localStorage.getItem('jwt'));
    localStorage.removeItem('email');
    setCurrentUser({});
    setIsLoggedIn(false);
  };

  const handleRegistracion = (user, password) => {
    auth
      .register(user, password)
      .then((res) => {
        if (res) {
          setIsRegistered(true);
          navigate('/signin');
        } else {
          setIsRegistered(false);
        }
      })
      .catch((err) => {
        setIsRegistered(false);
        console.log(`Error: ${err}`);
      })
      .finally(() => setIsToolTipOpen(true));
  };

  const login = (user, password) => {
    auth
      .login(user, password)
      .then((res) => {
        if (res) {
          setCurrentUser(res.data);
          setJWT(res.token);
          localStorage.setItem('jwt', res.token);
          handleLogin();
          navigate('/');
          console.log(res);
        }
      })
      .catch((err) => {
        console.log(`Error: ${err}`);
      });
  };

  useEffect(() => {
    if (jwt != null) {
      auth
        .checkToken(jwt)
        .then((res) => {
          if (res) {
            setIsLoggedIn(true);
            setCurrentUser(res.myUser);
            navigate('/');
          } else {
            localStorage.removeItem('jwt');
          }
        })
        .catch((err) => {
          console.log(`Error: ${err}`);
        });
    }
  }, []);

  useEffect(() => {
    const isJWT = localStorage.getItem('jwt');
    if (isJWT && isLoggedIn) {
      api
        .getCards(isJWT)
        .then((res) => {
          setCurrentCards(res.reverse());
        })
        .catch((err) => {
          console.log(`Error: ${err}`);
        });
    }
  }, [isLoggedIn]);

  function handleCardDelete(card) {
    api
      .removeCard(card._id, jwt)
      .then(() => {
        setCurrentCards(currentCards.filter((c) => c._id !== card._id));
      })
      .catch((err) => {
        console.log(`Error: ${err}`);
      });
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i[0] === currentUser._id);
    isLiked ? api.removeLike(card._id, jwt)
      .then((res) => {
        const newCards = currentCards.map((c) => (c._id === card._id ? res.data : c));
        setCurrentCards(newCards);
      })
      .catch((err) => console.log(`Error: ${err}`))
      : api.addLike(card._id, jwt)
        .then((res) => {
          const newCards = currentCards.map((c) => (c._id === card._id ? res.data : c));
          setCurrentCards(newCards);
        })
        .catch((err) => console.log(`Error: ${err}`));
  }

  const handleEscClose = useCallback((evt) => {
    if (evt.key === 'Escape') {
      // eslint-disable-next-line no-use-before-define
      closeAllPopups();
    }
  }, []);

  function addEscapeListener() {
    document.addEventListener('keyup', handleEscClose);
  }

  function closeAllPopups() {
    setAddPlaceOpen(false);
    setEditProfileOpen(false);
    setEditAvatarOpen(false);
    setIsImagePopuOpen(false);
    setSelectedCard(null);
    setIsToolTipOpen(false);
    document.removeEventListener('keyup', handleEscClose);
  }

  function handleCloseByClick(e) {
    if (e.target.classList.contains('cover')) {
      closeAllPopups();
    }
  }

  function handleCardClick(card) {
    setSelectedCard(card);
    setIsImagePopuOpen(true);
    addEscapeListener();
  }

  function handleUpdateUser({ name, about }) {
    api
      .updateUserId({ name, about }, jwt)
      .then((res) => {
        setCurrentUser(res.data);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Error: ${err}`);
      });
  }

  function handleUpdateAvatar(link) {
    api
      .changeProfilePic(link, jwt)
      .then((res) => {
        setCurrentUser(res.data);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Error: ${err}`);
      });
  }

  function handleAddCard({ name, link }) {
    api
      .addCard({ name, link, jwt })
      .then((res) => {
        setCurrentCards([res.data, ...currentCards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Error: ${err}`);
      });
  }
  function handleEditAvatarClick() {
    setEditAvatarOpen(true);
    addEscapeListener();
  }
  function handleEditProfileClick() {
    setEditProfileOpen(true);
    addEscapeListener();
  }
  function handleAddPlaceClick() {
    setAddPlaceOpen(true);
    addEscapeListener();
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className='page'>
        <Header
          containerClass='header container'
          vector={vector}
          logoClass='header__logo'
          userEmail={localStorage.getItem('email')}
          logout={handleLogOut}
          isLoggedIn={isLoggedIn}
        />
        <Routes>
          <Route
            exact
            path='/'
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <Main
                  onEditProfileClick={handleEditProfileClick}
                  onAddPlaceClick={handleAddPlaceClick}
                  onEditAvatarClick={handleEditAvatarClick}
                  onCardClick={handleCardClick}
                  cards={currentCards}
                  onCardLike={handleCardLike}
                  onCardDelete={handleCardDelete}
                />
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path='/signin'
            element={<Login handleLogin={login} />}
          ></Route>
          <Route
            exact
            path='/signup'
            element={<Register handleRegister={handleRegistracion} />}
          />
        </Routes>
        <InfoTooltip
          succes={isRegistered}
          isOpen={isToolTipOpen}
          onClose={closeAllPopups}
        />
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />
        <ImagePopup
          isOpen={isImagePopupOpen}
          onClick={handleCloseByClick}
          onClose={closeAllPopups}
          card={selectedCard}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddCard}
        />
        <Footer />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;

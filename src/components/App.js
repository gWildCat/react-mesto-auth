import { useCallback, useEffect, useState } from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import api from '../utils/Api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ConfirmDeletePopup from './ConfirmDeletePopup';
import Register from './Register';
import Login from './Login';
import InfoTooltip from './InfoTooltip';

function App() {
  // Переменные состояния
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isConfirmDeletePopupOpen, setConfirmDeletePopupOpen] = useState(false);
  const [isTooltipOpen, setTooltipOpen] = useState(false);
  const [cardToDelete, setCardToDelete] = useState({});
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Обработка ошибок
  function handleError(error) {
    console.error(`🔥ERROR: ${error}`);
    alert(`ОШИБКА: ${error}`);
  }
  // Обработчик закрытия попапа по Escape
  const handleEscClosePopup = useCallback((evt) => evt.key === 'Escape' && closeAllPopups(), []);
  // Установка и снятие слушателя закрытия попапа по Escape
  useEffect(() => {
    if (
      isEditProfilePopupOpen ||
      isAddPlacePopupOpen ||
      isEditAvatarPopupOpen ||
      isConfirmDeletePopupOpen ||
      selectedCard
    ) {
      document.addEventListener('keydown', handleEscClosePopup);
    } else {
      document.removeEventListener('keydown', handleEscClosePopup);
    }
  }, [
    isEditProfilePopupOpen,
    isAddPlacePopupOpen,
    isEditAvatarPopupOpen,
    isConfirmDeletePopupOpen,
    selectedCard,
    handleEscClosePopup,
  ]);

  // Запись данных пользователя в переменную состояния
  useEffect(() => {
    api
      .getInitialData()
      .then(([initialCards, currentUser]) => {
        setCurrentUser(currentUser);
        setCards([...cards, ...initialCards]);
      })
      .catch((error) => handleError(error));
  }, []);

  // Обработчик нажатия на кнопку редактирования профиля
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }
  // Обработчик нажатия на кнопку добавления карточки
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }
  // Обработчик нажатия на кнопку редактирования аватара
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }
  // Обработчик нажатия на иконку удаления
  function handleCardDeleteClick(card) {
    setCardToDelete(card);
    setConfirmDeletePopupOpen(true);
  }
  // Обработчик нажатия на кнопку закрытия попапа
  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setConfirmDeletePopupOpen(false);
    setSelectedCard(null);
    setTooltipOpen(false);
  }
  // Обработчик нажатия на изображение в карточке
  function handleCardClick(card) {
    setSelectedCard(card);
  }
  // Обработчик клика по оверлею
  function handleOverlayClick(evt) {
    evt.target === evt.currentTarget && closeAllPopups();
  }
  // Обработчик добавления лайка
  function handleCardLike(card) {
    // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
    const isLiked = card.likes.some((user) => user._id === currentUser._id);
    // Отправляем запрос в API и получаем обновлённые данные карточки
    api
      .changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => (c._id === card._id ? newCard : c)));
      })
      .catch((error) => handleError(error));
  }

  // Обработчик удаления карточки
  function handleCardConfirmDelete(card) {
    setIsLoading(true);
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id));
        closeAllPopups();
      })
      .catch((error) => handleError(error))
      .finally(() => setIsLoading(false));
  }
  // Обработчик обновления данных пользователя
  function handleUpdateUser(userData) {
    setIsLoading(true);
    api
      .setProfileData(userData)
      .then((updatedUserData) => {
        setCurrentUser(updatedUserData);
        closeAllPopups();
      })
      .catch((error) => handleError(error))
      .finally(() => setIsLoading(false));
  }
  // Обработчик обновления аватара пользователя
  function handleUpdateAvatar(avatarData) {
    setIsLoading(true);
    api
      .changeAvatar(avatarData)
      .then((updatedUserData) => {
        setCurrentUser(updatedUserData);
        closeAllPopups();
      })
      .catch((error) => handleError(error))
      .finally(() => setIsLoading(false));
  }
  // Обработчик добавления новой карточки
  function handleAddPlaceSubmit(cardData) {
    setIsLoading(true);
    api
      .addCard(cardData)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((error) => handleError(error))
      .finally(() => setIsLoading(false));
  }

  // Обработчик регистрации нового пользователя
  function handleRegisterNewUser(userData) {
    console.log(userData);
  }
  // Обработчик входа пользователя в систему
  function handleLogin(userData) {
    console.log(userData);
  }

  return (
    <div className="app">
      <div className="page">
        <Header />
        <CurrentUserContext.Provider value={currentUser}>
          <Main
            cards={cards}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            onCardClick={handleCardClick}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDeleteClick}
          />
          {/* <Register isLoading={isLoading} onRegisterNewUser={handleRegisterNewUser} /> */}
          {/* <Login isLoading={isLoading} onLogin={handleLogin} /> */}
          <InfoTooltip
            isOpen={isTooltipOpen}
            isSuccess={true}
            onOverlayClick={handleOverlayClick}
            onClose={closeAllPopups}
          />
          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
            onOverlayClick={handleOverlayClick}
            isLoading={isLoading}
          />
        </CurrentUserContext.Provider>
        <Footer />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
          onOverlayClick={handleOverlayClick}
          isLoading={isLoading}
        />
        <ConfirmDeletePopup
          isOpen={isConfirmDeletePopupOpen}
          onClose={closeAllPopups}
          cardToDelete={cardToDelete}
          onConfirmDelete={handleCardConfirmDelete}
          onOverlayClick={handleOverlayClick}
          isLoading={isLoading}
        />
        <EditAvatarPopup
          onClose={closeAllPopups}
          isOpen={isEditAvatarPopupOpen}
          onUpdateAvatar={handleUpdateAvatar}
          onOverlayClick={handleOverlayClick}
          isLoading={isLoading}
        />
        <ImagePopup
          selectedCard={selectedCard}
          onClose={closeAllPopups}
          onOverlayClick={handleOverlayClick}
        />
      </div>
    </div>
  );
}

export default App;

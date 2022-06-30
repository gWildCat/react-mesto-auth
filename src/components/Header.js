import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import headerLogoPath from '../images/header-logo.svg';

const Header = ({ onLogout, isLoggedIn, userEmail }) => {
  // Переменные состояния
  const [btnState, setbtnState] = useState({ label: '', action: () => {} });
  // Хук useLocation
  const location = useLocation();
  // Хук useNavigation
  const navigate = useNavigate();
  // Функция определения надписи на кнопке
  function changeBtnLabel() {
    if (isLoggedIn) {
      setbtnState({ ...btnState, label: 'Выйти', action: onLogout });
    } else if (location.pathname === '/sign-in') {
      setbtnState({ ...btnState, label: 'Регистрация', action: () => navigate('/sign-up') });
    } else {
      setbtnState({ ...btnState, label: 'Вход', action: () => navigate('/sign-in') });
    }
  }
  // Обновление надписи на кнопке
  useEffect(() => {
    changeBtnLabel();
  }, [isLoggedIn, location]);
  // Открытие / закрытие меню
  function toggleMenu() {
    const headerMenu = document.querySelector('.header__menu');
    headerMenu.classList.toggle('header__menu_visible');
  }

  return (
    <>
      <header className="header">
        <img className="header__logo" src={headerLogoPath} alt="Логотип Mesto" />
        <ul className="header__menu">
          <li>
            <p className="header__user-email">{userEmail && userEmail}</p>
          </li>
          <li>
            <button className="header__sign-button" onClick={btnState.action}>
              {btnState.label}
            </button>
          </li>
        </ul>
        <button onClick={toggleMenu} className="header__menu-button"></button>
      </header>
    </>
  );
};

export default Header;

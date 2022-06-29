import React from 'react';
import headerLogoPath from '../images/header-logo.svg';

const Header = ({ onLogout }) => {
  return (
    <>
      <header className="header">
        <img className="header__logo" src={headerLogoPath} alt="Логотип Mesto" />
        <button onClick={onLogout}>ВЫЙТИ</button>
      </header>
    </>
  );
};

export default Header;

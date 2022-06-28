import React from 'react';

const PopupWithForm = ({
  name,
  title,
  isOpen,
  onClose,
  btnTitle,
  children,
  onSubmit,
  onOverlayClick,
  isValid,
}) => {
  return (
    <div
      className={`popup popup_light popup_type_${name} ${isOpen && 'popup_opened'}`}
      id="edit-profile"
      onClick={onOverlayClick}
    >
      <div className="popup__container">
        <form className="form" name={name} noValidate onSubmit={onSubmit}>
          <h2 className="form__header">{title}</h2>
          {children}
          <button
            className={`${!isValid && 'form__save-button_inactive'} form__save-button`}
            title={btnTitle}
            type="submit"
            disabled={!isValid}
          >
            {btnTitle}
          </button>
        </form>
        <button
          className="popup__close-button"
          title="Закрыть"
          type="button"
          aria-label="Закрыть форму"
          onClick={onClose}
        ></button>
      </div>
    </div>
  );
};

export default PopupWithForm;

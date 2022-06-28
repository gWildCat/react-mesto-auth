import successIconPath from '../images/infotooltip-success-icon.svg';
import errorIconPath from '../images/infotooltip-error-icon.svg';

const InfoTooltip = ({ isOpen, isSuccess, onOverlayClick, onClose }) => {
  return (
    <div className={`popup popup_light ${isOpen && 'popup_opened'}`} onClick={onOverlayClick}>
      <div className="popup__container">
        <div className="popup__info-tooltip">
          <img
            className="popup__status-image"
            src={isSuccess ? successIconPath : errorIconPath}
            alt={isSuccess ? 'Иконка успешной регистрации' : 'Иконка ошибки'}
          />
          <p className="popup__message">
            {isSuccess
              ? 'Вы успешно зарегистрировались!'
              : 'Что-то пошло не так! Попробуйте ещё раз.'}
          </p>
        </div>
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

export default InfoTooltip;

import css from './Modal.module.css';
import PropTypes from 'prop-types';
import { useEffect } from 'react';

export const Modal = ({ onCloseModal, image }) => {
  useEffect(() => {
    const handleEscPress = event => {
      if (event.key === 'Escape') {
        onCloseModal();
      }
    };

    window.addEventListener('keydown', handleEscPress);

    return () => {
      window.removeEventListener('keydown', handleEscPress);
    };
  }, [onCloseModal]);

  const handleBackdropClick = event => {
    if (event.currentTarget === event.target) {
      onCloseModal();
    }
  };

  return (
    <>
      <div onClick={handleBackdropClick} className={css.Overlay}>
        <div className={css.Modal}>
          <img src={image.largeImageURL} alt="" />
        </div>
      </div>
      ;
    </>
  );
};


Modal.propTypes = {
  image: PropTypes.shape({
    largeImageURL: PropTypes.string.isRequired,
  }),
};

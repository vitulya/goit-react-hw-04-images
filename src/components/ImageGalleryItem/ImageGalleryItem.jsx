import css from './ImageGalleryItem.module.css';
import PropTypes from 'prop-types';

export const ImageGalleryItem = ({ images, onOpenModal }) => {
  return (
    <>
      {images?.map(image => {
        return (
          <li key={image.id} className={css.ImageGalleryItem}>
            <img
              onClick={() => onOpenModal(image)}
              className={css.ImageGalleryItemImage}
              src={image.webformatURL}
              alt=""
            />
          </li>
        );
      })}
    </>
  );
};

ImageGalleryItem.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
    })
  ),
};

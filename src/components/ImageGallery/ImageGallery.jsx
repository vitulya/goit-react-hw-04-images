import css from './ImageGallery.module.css';
import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem.jsx';
import PropTypes from 'prop-types';

export const ImageGallery = ({ onOpenModal, images }) => {
  return (
    <>
      <ul className={css.ImageGallery}>
        <ImageGalleryItem onOpenModal={onOpenModal} images={images} />
      </ul>
    </>
  );
};

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(PropTypes.shape()),
  isLoading: PropTypes.bool.isRequired,
};

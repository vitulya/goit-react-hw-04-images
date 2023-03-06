import css from './App.module.css';
import { useState, useEffect } from 'react';
import { getImages } from '../services/images.service.jsx';

import { Searchbar } from './Searchbar/Searchbar.jsx';
import { ImageGallery } from './ImageGallery/ImageGallery.jsx';
import { Button } from './Button/Button.jsx';
import { Modal } from './Modal/Modal.jsx';
import { Loader } from './Loader/Loader';

export const App = () => {
  const [images, setImages] = useState(null);
  const [page, setPage] = useState(1);
  const [value, setValue] = useState('');
  const [submitValue, setSubmitValue] = useState('');
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [currentImage, setCurrentImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [totalHits, setTotalHits] = useState(null);

  useEffect(() => {
    async function fetchImages() {
      setIsLoading(true);

      if (page !== 1) {
        try {
          const fetchImages = await getImages(page, submitValue);
          setImages(prevImage => [...prevImage, ...fetchImages.hits]);
        } catch (error) {
          setError(error);
        } finally {
          setIsLoading(false);
        }
      } else {
        try {
          const images = await getImages(page, submitValue);
          setPage(1);
          setImages(images.hits);
          setTotalHits(images.totalHits);
        } catch (error) {
          setError(error);
        } finally {
          setIsLoading(false);
        }
      }
    }

    if (submitValue) {
      fetchImages();
    } else {
      setImages(null);
      setPage(1);
      setTotalHits(null);
      return;
    }
  }, [page, submitValue]);

  const handleChangePage = () => {
    setPage(prevPage => prevPage + 1);
  };

  const handleChangeValue = e => {
    const { value } = e.target;
    setValue(value);
  };

  const handleSubmitInputValue = e => {
    e.preventDefault();

    setSubmitValue(prevValue => {
      if (prevValue !== value) {
        setImages(null);
        setPage(1);
        setTotalHits(null);
      }
      return value;
    });
  };

  const handleToggleModal = image => {
    setIsOpenModal(prevIsOpenModal => !prevIsOpenModal);
    setCurrentImage(image);
  };

  return (
    <div className={css.App}>
      <Searchbar
        handleChangeValue={handleChangeValue}
        onSubmit={handleSubmitInputValue}
      />

      <ImageGallery
        onOpenModal={handleToggleModal}
        images={images}
        isLoading={isLoading}
      />
      {isLoading && <Loader />}
      {error && <h1>Спробуйте перезагрузити сторінку...</h1>}
      {images?.length < totalHits && <Button onClick={handleChangePage} />}
      {isOpenModal && (
        <Modal onCloseModal={handleToggleModal} image={currentImage} />
      )}
    </div>
  );
};

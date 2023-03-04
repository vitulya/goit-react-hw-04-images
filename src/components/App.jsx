import css from './App.module.css';
// import { Component } from 'react';
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

  // async componentDidUpdate(_, prevState) {

  //   if (prevState.page !== page) {
  //     setIsLoading(true)
  // try {
  //   const images = await getImages(page, value);
  //   setImages(prevImage=>([...prevImage, ...images.hits]))
  // } catch (error) {
  //   setError(error)
  // } finally {
  //   setIsLoading(false)
  // }
  //   }

  //   if (prevState.submitValue !== submitValue) {
  //     setIsLoading(true)
  //     try {
  //       const images = await getImages(page, value);
  //       setPage(1);
  //       setImages(images.hits);
  //       setTotalHits(images.totalHits)

  //     } catch (error) {
  //       setError(error)
  //     } finally {
  //       setIsLoading(false)
  //     }
  //   }
  // }

  useEffect(() => {
    async function fetchImages() {
      setIsLoading(true);

      if (page !== 1) {
        try {
          const fetchImages = await getImages(page, value);
          setImages(prevImage => [...prevImage, ...fetchImages.hits]);
        } catch (error) {
          setError(error);
        } finally {
          setIsLoading(false);
        }
      } else {
        try {
          const images = await getImages(page, value);
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
    }

    // async function foo() {
    //   try {
    //     const images = await getImages(page, value);
    //     console.log(images);
    //     setImages(images.hits);
    //     // setImages(prevImage => [...prevImage, ...images.hits]);
    //   } catch (error) {
    //     setError(error);
    //   } finally {
    //     setIsLoading(false);
    //   }
    // }
    // if (submitValue) {
    //   foo();
    // }
  }, [page, submitValue, value]);

  // useEffect(() => {
  //   async function foo() {
  //     setIsLoading(true);
  //     try {
  //       const images = await getImages(page, value);
  //       setImages(prevImage => [...prevImage, ...images.hits]);
  //     } catch (error) {
  //       setError(error);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   }
  //   foo();
  // }, [page, value]);

  // useEffect(() => {
  // async function foo() {
  //   setIsLoading(true);
  //   try {
  //     const images = await getImages(page, value);
  //     setPage(1);
  //     setImages(images.hits);
  //     setTotalHits(images.totalHits);
  //   } catch (error) {
  //     setError(error);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // }
  // foo();
  // }, [page, value, submitValue]);

  const handleChangePage = () => {
    setPage(prevPage => prevPage + 1);
  };

  const handleChangeValue = e => {
    const { value } = e.target;
    setValue(value);
  };

  const handleSubmitInputValue = e => {
    e.preventDefault();

    setSubmitValue(value);
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

// export class App extends Component {
//   state = {
//     images: null,
//     page: 1,
//     value: '',
//     submitValue: '',
//     isOpenModal: false,
//     currentImage: null,
//     isLoading: false,
//     error: null,
//     totalHits: null,
//   };

//   async componentDidUpdate(_, prevState) {
//     const { page, value, submitValue } = this.state;

//     if (prevState.page !== page) {
//       this.setState({
//         isLoading: true,
//       });
//       try {
//         const images = await getImages(page, value);
//         this.setState(prev => ({
//           images: [...prev.images, ...images.hits],
//         }));
//       } catch (error) {
//         this.setState({
//           error,
//         });
//       } finally {
//         this.setState({
//           isLoading: false,
//         });
//       }
//     }

//     if (prevState.submitValue !== submitValue) {
//       this.setState({
//         isLoading: true,
//       });
//       try {
//         const images = await getImages(page, value);
//         console.log(images);
//         this.setState({
//           page: 1,
//           images: images.hits,
//           totalHits: images.totalHits,
//         });
//       } catch (error) {
//         this.setState({
//           error,
//         });
//       } finally {
//         this.setState({
//           isLoading: false,
//         });
//       }
//     }
//   }

//   handleChangePage = () => {
//     this.setState(prev => ({ page: prev.page + 1 }));
//   };

//   handleChangeValue = e => {
//     const { value } = e.target;

//     this.setState({
//       value,
//     });
//   };

//   handleSubmitInputValue = e => {
//     e.preventDefault();
//     this.setState({
//       submitValue: this.state.value,
//     });
//   };

//   handleToggleModal = image => {
//     this.setState(prevState => ({
//       isOpenModal: !prevState.isOpenModal,
//       currentImage: image,
//     }));
//   };

//   render() {
//     const { currentImage, isLoading, error, images, totalHits } = this.state;
//     return (
//       <div className={css.App}>
//         <Searchbar
//           handleChangeValue={this.handleChangeValue}
//           onSubmit={this.handleSubmitInputValue}
//         />

//         <ImageGallery
//           onOpenModal={this.handleToggleModal}
//           images={this.state.images}
//           isLoading={isLoading}
//         />
//         {isLoading && <Loader />}
//         {error && <h1>Спробуйте перезагрузити сторінку...</h1>}
//         {images?.length < totalHits && (
//           <Button onClick={this.handleChangePage} />
//         )}
//         {this.state.isOpenModal && (
//           <Modal onCloseModal={this.handleToggleModal} image={currentImage} />
//         )}
//       </div>
//     );
//   }
// }

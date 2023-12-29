import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getImg } from 'api/api';
import { SubmitForm } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import { ModalImg } from './Modal/Modal';

export const App = () => {
  const [textForSearch, setTextForSearch] = useState('');
  const [pictures, setPictures] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [largeurl, setLargeurl] = useState('');
  const alt = 'Image description';
  const Btn = status === 'resolved' && pictures.length > 0;

  const handleSubmit = text => {
    if (textForSearch !== text) {
      setTextForSearch(text);
      setPictures([]);
      setCurrentPage(1);
    } else if (text === textForSearch) {
      return toast.warn(`Ви вже переглядаєте ${text}`);
    }
  };

  useEffect(() => {
    if (textForSearch === '') {
      return;
    }

    async function addImages() {
      try {
        const data = await getImg(textForSearch, currentPage);
        const pictures = data.hits;

        if (!pictures.length) {
          setError(`Зображення ${textForSearch} відсутні`);
          setStatus('rejected');
        } else {
          setPictures(prevState => [...prevState, ...pictures]);
          setStatus('resolved');
        }
      } catch (error) {
        setError(error.message);
        setStatus('rejected');
      }
    }

    addImages();
  }, [currentPage, textForSearch]);

  const openModal = event => {
    setLargeurl(event.target.dataset.url);
    toggleModal();
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const loadMore = () => {
    setCurrentPage(prevState => prevState + 1);
  };

  return (
    <>
      <SubmitForm onSubmit={handleSubmit} />
      {status === 'pending' && <Loader display="centre" />}
      {status === 'resolved' && (
        <ImageGallery pictures={pictures} onOpenModal={openModal} />
      )}
      {status === 'rejected' && <p>{error}</p>}
      {Btn && <Button loadMore={loadMore} />}
      {showModal && (
        <ModalImg closeModal={toggleModal}>
          <img src={largeurl} alt={alt} />
        </ModalImg>
      )}
      <ToastContainer autoClose={3000} />
    </>
  );
};

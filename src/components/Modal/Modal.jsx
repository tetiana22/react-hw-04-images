import React, { useEffect } from 'react';
import { Overlay, Modal } from './Modal.styled';

export const ModalImg = ({closeModal, children}) => {
  const handleBackdrop = event => {
    if (event.currentTarget === event.target) {
     closeModal();
    }
  };
  
  useEffect(() => {
     const handleKeyDown = event => {
    if (event.code === 'Escape') {
      closeModal();
    }
  };

    window.addEventListener('keydown', handleKeyDown);
   return () => {
    window.removeEventListener('keydown',handleKeyDown);  
  };
}, [closeModal])

 return (
      <Overlay onClick={handleBackdrop}>
        <Modal>{children}</Modal>
      </Overlay>
    );
  }

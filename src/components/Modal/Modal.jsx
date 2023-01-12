import { useEffect } from "react";
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import css from "./Modal.module.css";

const modalRoot = document.querySelector('#modal-root');

export function Modal({ children, closeModal, tags }) {  
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  });
 
  const handleKeyDown = event => {
    if (event.code === 'Escape') {
      closeModal();
    };
  };

  const handleBackdropClick = event => {
    if (event.currentTarget === event.target) {
      closeModal();
    };
  };

  return createPortal(
    <div className={css.overlay} onClick={handleBackdropClick}>
      <div className={css.modal}>
        <img src={children} alt={tags} />
      </div>
    </div>,
    modalRoot
  );
  
};

Modal.propTypes = {
  children: PropTypes.string.isRequired,
  closeModal: PropTypes.func.isRequired,
  tags: PropTypes.string.isRequired,
};



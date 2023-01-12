import React from "react";
import { useState } from "react";
import PropTypes from "prop-types";
import css from "./ImageGalleryItem.module.css";
import { Modal } from "../Modal/Modal";

export function ImageGalleryItem({ webformatURL, largeImageURL, tags }) {
  const [showModal, setShowModal] = useState(false);

  const onOpenModal = () => {
    setShowModal(true);
  };

  const onCloseModal = () => {
    setShowModal(false);
  };
  
  return (
    <>
      <li className={css.galleryItem} onClick={onOpenModal}>
        <img
          className={css.image}
          src={webformatURL}
          alt={tags}
        />
      </li>
      {showModal &&
        <Modal
          children={largeImageURL}
          closeModal={onCloseModal}
          tags={tags}
        />}
    </>
  );
};

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
};










// export const ImageGalleryItem = ({largeImageURL, webformatURL, onClick}) => {
//   return (
//     <li onClick={onClick}>
//       <img className={css.image} src={webformatURL} alt="" />
      
//     </li>
//   )
// }
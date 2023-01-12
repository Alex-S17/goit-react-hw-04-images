import React from "react";
import { Component } from "react";
import PropTypes from "prop-types";
import css from "./ImageGalleryItem.module.css";
import { Modal } from "../Modal/Modal";

export class ImageGalleryItem extends Component {
  static propTypes = {
    webformatURL: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
  };
  
  state = {
    showModal: false,
  };

  onOpenModal = () => {
    this.setState({ showModal: true, })
  };

  onCloseModal = () => {
    this.setState({ showModal: false, })
  };

  render() {
    const { webformatURL, largeImageURL, tags } = this.props;
    return (
      <>
        <li className={css.galleryItem} onClick={this.onOpenModal}>
          <img
            className={css.image}
            src={webformatURL}
            alt={tags}
          />
        </li>
        {this.state.showModal &&
          <Modal
            children={largeImageURL}
            closeModal={this.onCloseModal}
            tags={tags}
          />}
      </>
    );
  };
};










// export const ImageGalleryItem = ({largeImageURL, webformatURL, onClick}) => {
//   return (
//     <li onClick={onClick}>
//       <img className={css.image} src={webformatURL} alt="" />
      
//     </li>
//   )
// }
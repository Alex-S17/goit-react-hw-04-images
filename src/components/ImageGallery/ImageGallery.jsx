import { ImageGalleryItem } from "../ImageGalleryItem/ImageGalleryItem";
import PropTypes from "prop-types";
import css from "./ImageGallery.module.css";

export const ImageGallery = ({ arrayOfImages }) => {
  return (
    <ul className={css.imageGallery}>
      {arrayOfImages.map(image => (
        <ImageGalleryItem
          key={image.id}
          largeImageURL={image.largeImageURL}
          webformatURL={image.webformatURL}
          tags={image.tags}
        />
      ))
      }
    </ul>
  );
};

ImageGallery.propTypes = {
  arrayOfImages: PropTypes.array.isRequired,
};


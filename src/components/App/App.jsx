import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Dna } from 'react-loader-spinner';
import { Searchbar } from "../Searchbar/Searchbar";
import { requestImages } from "../../services/requestImages/requestImages";
import { ImageGallery } from "../ImageGallery/ImageGallery";
import { Button } from "../Button/Button";

export function App() {
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [httpQuery, setHttpQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [isButtonVisible, setIsButtonVisible] = useState(false);

  useEffect(() => {
    if (httpQuery === '') {
      return;
    }
    (async () => {
      try {
        setLoading(true);
        const objectOfImages = await requestImages(httpQuery, page);
        const arrayOfImages = objectOfImages.data.hits;
        const totalImageNumber = objectOfImages.data.totalHits;
        const totalPage = Math.ceil(totalImageNumber / 12);
        if (objectOfImages.data.total === 0) {
          return toast.error("No images found. Input another query", {
            position: "top-left",
            autoClose: 3000,
            theme: "colored",
          });
        };
      
        if (page < totalPage) {
          setIsButtonVisible(true);
        }
        else { setIsButtonVisible(false) };
      
        setImages(prevImagesArray => [...prevImagesArray, ...arrayOfImages]);
      } catch (error) {
        toast.error(`${error}`, {
          position: "top-left",
          autoClose: 3000,
          theme: "colored",
        });
      } finally {
        setLoading(false);
      };
    })();    
  }, [httpQuery, page]);
  
  const handleSubmit = (inputedQuery) => {
    if (inputedQuery.trim().toLowerCase() === '') {
      return toast.info("Please, enter the query", {
        position: "top-right",
        autoClose: 3000,      
        theme: "colored",
      });      
    };
    setHttpQuery(inputedQuery);
    setPage(1);
    setImages([]);    
  };

  const handleButtonClick = () => {
    setPage(prevState => (prevState + 1));
  };
  
  return (
    <>
      <Searchbar onSubmit={handleSubmit} />
      {loading && (<Dna
        visible={true}
        height="200"
        width="200"
        ariaLabel="dna-loading"
        wrapperStyle={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      />)}
      {images.length > 0 && <ImageGallery arrayOfImages={images} />}
      {isButtonVisible && <Button onButtonClick={handleButtonClick} />}
      <ToastContainer
        position="top-center"
        autoClose={3000}
      />
    </>
  );
};

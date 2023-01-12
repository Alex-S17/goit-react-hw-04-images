import React from "react";
import { Component } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Dna } from 'react-loader-spinner';
import { Searchbar } from "../Searchbar/Searchbar";
import { requestImages } from "../../services/requestImages/requestImages";
import { ImageGallery } from "../ImageGallery/ImageGallery";
import { Button } from "../Button/Button";

export class App extends Component {
  state = {
    page: 1,
    images: [],
    httpQuery: '',
    loading: false,
    isButtonVisible: false,
  }

  async componentDidUpdate(prevProps, prevState) {
    const { httpQuery, page, } = this.state;
    if (prevState.httpQuery !== httpQuery || page > prevState.page) {
      try {
        this.setState({ loading: true, })
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
          this.setState({ isButtonVisible: true, })
        }
        else { this.setState({ isButtonVisible: false, }) };
        
        this.setState(prevState => {
          return {
            images: [...prevState.images, ...arrayOfImages],
          };
        });
      } catch (error) {
        toast.error(`${error}`, {
          position: "top-left",
          autoClose: 3000,
          theme: "colored",
        });
      } finally {
        this.setState({ loading: false, })
      };
    };
  };

  handleSubmit = (inputedQuery) => {
    if (inputedQuery.trim().toLowerCase() === '') {
      return toast.info("Please, enter the query", {
        position: "top-right",
        autoClose: 3000,      
        theme: "colored",
      });      
    };
    this.setState({
      httpQuery: inputedQuery,
      page: 1,
      images: [],
    });
  };

  handleButtonClick = () => {
    this.setState(prevState => {
      return {
        page: prevState.page + 1,
      };
    });
  };

  render() {
    const { loading, images, isButtonVisible } = this.state;
    return (
      <>
        <Searchbar onSubmit={this.handleSubmit} />
        {loading && (<Dna
          visible={true}
          height="200"
          width="200"
          ariaLabel="dna-loading"
          wrapperStyle={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",}}
        />)}
        {images.length > 0 && <ImageGallery arrayOfImages={images} />}
        {isButtonVisible && <Button onButtonClick={this.handleButtonClick} />}
        <ToastContainer
          position="top-center"
          autoClose={3000}
        />
      </>
    );
  };
};

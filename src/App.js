import React, { useState, useEffect } from 'react';
// import axios from 'axios';
import imagesApi from './Components/imagesApi';
import Searchbar from './Components/Searchbar';
import ImageGallery from './Components/ImageGallery';
import ImageGalleryItem from './Components/ImageGalleryItem'
import Button from './Components/Button';
import Modal from './Components/Modal';
import Loader from 'react-loader-spinner';

import './App.css';

export default function App() {
  const [images, setImages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentPageImages, setCurrentPageImages] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [largeImage, setLargeImage] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [modalUrl, setModalUrl] = useState('');
  const [modalAlt, setModalAlt] = useState('');

  useEffect(() => {
    if (!searchQuery) {
      return;
    }
    fetchImages();
  }, [searchQuery]);

  const onChangeQuery = searchQuery => {
    setSearchQuery(searchQuery);
    setCurrentPage(1);
    setImages([]);
    setError(null);
  }

  const toggleModal = () => {
    setShowModal(!showModal);
  }

  const fetchImages = () => {
    const options = { searchQuery, currentPage };
    setIsLoading(true)

    imagesApi
    .fetchImages(options)
    .then(images => {
      setImages(prevImages => [...prevImages, ...images]);
      setCurrentPage(s => s + 1);
      setCurrentPageImages([...images]);
      if (images.length === 0) {
        setError('Nothing was find by your query. Try again.');
      }})
    .catch(error => setError(error.message))
    .finally(() => setIsLoading(false));
  };

  const onClickImageGalleryItem = e => {
    setModalUrl(e.currentTarget.getAttribute('url'));
    setModalAlt(e.currentTarget.getAttribute('alt'));
    toggleModal();
  };

    const shouldRenderLoadMoreButton = () => {
      const should = !(currentPageImages.length < 12) && !isLoading;
      return should;
    } 

    return (
      <>
        <Searchbar onChangeQuery={onChangeQuery} />
        {error && (
          <p style={{ color: 'red', textAlign: 'center', fontSize: '20px' }}>
            This is error: {error}
          </p>
        )}

        <ImageGallery>
          {images.map(({ id, tags, webformatURL, largeImageURL }) => (
            <ImageGalleryItem key={id} alt={tags} src={webformatURL} url={largeImageURL} onClick={onClickImageGalleryItem} />
          ))}
        </ImageGallery>
        { isLoading && <Loader type="Bars" color="#00BFFF" height={80} width={80} /> }       

        { shouldRenderLoadMoreButton() && 
          <Button onFetchImages={fetchImages}/> }

        {showModal && (
          <Modal src={modalUrl} alt={modalAlt} onClose={toggleModal} />
        )}  
      </>      
    )    
};

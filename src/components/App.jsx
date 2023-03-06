import { Component } from 'react';

import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { LoadMore } from './LoadmoreButton/LoadMoreButton';
import { Loader } from './Spinner/Spinner';
// import { GalleryWindow } from './GalleryWindow/GalleryWindow';

import { fetchPictures } from 'utils/fetchFunction';

export class App extends Component {
   state = {
      queryParameter: '',
      currentPage: 1,
      pictures: [],
      isLoading: false,
      isOpenModal: false,
   };

   componentDidUpdate(_, prevState) {
      const { queryParameter, currentPage } = this.state;
      if (prevState.queryParameter !== queryParameter) {
         this.setState({ isLoading: true });
         fetchPictures(queryParameter)
            .then(response => response.json())
            .then(data => {
               console.log('currentPageQuery', currentPage);
               this.setState({ currentPage: 1, pictures: [...data.hits], isLoading: false });
            });
      }
      if (prevState.currentPage !== currentPage && currentPage !== 1) {
         this.setState({ isLoading: true });
         fetchPictures(queryParameter, currentPage)
            .then(response => response.json())
            .then(data => {
               this.setState(prevState => {
                  console.log('currentPage', currentPage);
                  return { pictures: [...prevState.pictures, ...data.hits], isLoading: false };
               });
            });
      }

      return;
   }

   incrementPage = () => {
      this.setState(prevState => {
         return { currentPage: prevState.currentPage + 1 };
      });
   };

   onSubmit = searchQuery => {
      this.setState({ queryParameter: searchQuery });
   };

   onCloseToggle = () => {
      this.setState({ isOpenModal: !this.state.isOpenModal });
   };

   render() {
      const { isLoading, pictures, isOpenModal } = this.state;
      return (
         <>
            <Searchbar onSubmit={this.onSubmit} />
            {isLoading && <Loader />}
            <ImageGallery
               galleryData={pictures}
               onClose={this.onCloseToggle}
               isModalOpen={isOpenModal}
            />
            {pictures.length >= 12 && <LoadMore incrementPage={this.incrementPage} />}
         </>
      );
   }
}

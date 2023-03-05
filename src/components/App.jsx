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

   componentDidMount() {
      this.setState({ isLoading: true });
      fetchPictures(this.state.queryParameter)
         .then(response => response.json())
         .then(data => {
            this.setState({ pictures: [...data.hits], isLoading: false });
         });
   }

   componentDidUpdate(_, prevState) {
      if (prevState.queryParameter !== this.state.queryParameter) {
         this.setState({ isLoading: true });
         fetchPictures(this.state.queryParameter)
            .then(response => response.json())
            .then(data => {
               console.log('currentPageQuery', this.state.currentPage);
               this.setState({ currentPage: 1, pictures: [...data.hits], isLoading: false });
            });
      }
      if (prevState.currentPage !== this.state.currentPage && this.state.currentPage !== 1) {
         this.setState({ isLoading: true });
         fetchPictures(this.state.queryParameter, this.state.currentPage)
            .then(response => response.json())
            .then(data => {
               this.setState(prevState => {
                  console.log('currentPage', this.state.currentPage);
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
      // console.log('incrementPage', this.state.currentPage);
      return (
         <>
            <Searchbar onSubmit={this.onSubmit} />
            {this.state.isLoading && <Loader />}
            <ImageGallery
               galleryData={this.state.pictures}
               onClose={this.onCloseToggle}
               isModalOpen={this.state.isOpenModal}
            />
            {/* {this.state.isOpenModal && <GalleryWindow onClose={this.onCloseToggle} />} */}
            {this.state.pictures.length > 0 && <LoadMore incrementPage={this.incrementPage} />}
         </>
      );
   }
}

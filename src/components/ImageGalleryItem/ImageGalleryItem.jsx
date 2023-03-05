import { Component } from 'react';
import { GalleryWindow } from 'components/GalleryWindow/GalleryWindow';

import { GalleryElement, GalleryImage } from './ImageGalleryItem.styled';

export class ImageGalleryItem extends Component {
   state = {
      currentImage: '',
      isOpenModalGallery: false,
   };

   getCurrentImage = () => {
      this.setState({ currentImage: this.props.imageData.largeImageURL });
   };

   onCloseToggle = () => {
      this.setState({ isOpenModalGallery: !this.state.isOpenModalGallery });
   };

   render() {
      return (
         <>
            <GalleryElement
               onClick={() => {
                  this.onCloseToggle();
               }}
            >
               <GalleryImage
                  src={this.props.imageData.previewURL}
                  alt={this.props.imageData.tags}
                  onClick={this.getCurrentImage}
               />
            </GalleryElement>
            {this.state.isOpenModalGallery && (
               <GalleryWindow
                  onClose={this.onCloseToggle}
                  isModalOpen={this.state.isOpenModalGallery}
                  largeImage={this.state.currentImage}
               />
            )}
         </>
      );
   }
}

// export const ImageGalleryItem = ({ imageData, onOpen }) => {
//    // console.log('imageData', imageData);
//    const { previewURL, tags } = imageData;
// return (
//    <GalleryElement
//       onClick={() => {
//          console.log(imageData);
//          onOpen();
//       }}
//    >
//       <GalleryImage src={previewURL} alt={tags} />
//    </GalleryElement>
// );
// };

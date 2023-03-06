import { Component } from 'react';
import { ModalWindow } from 'components/ModalWindow/ModalWindow';

import { GalleryElement, GalleryImage } from './ImageGalleryItem.styled';

export class ImageGalleryItem extends Component {
   state = {
      isOpenModalGallery: false,
   };

   onToggleModal = () => {
      this.setState(prevState => {
         return { isOpenModalGallery: !prevState.isOpenModalGallery };
      });
   };

   render() {
      const { webformatURL, tags, largeImageURL } = this.props.imageData;
      const { isOpenModalGallery } = this.state;
      return (
         <>
            <GalleryElement
               onClick={() => {
                  this.onToggleModal();
               }}
            >
               <GalleryImage src={webformatURL} alt={tags} onClick={this.getCurrentImage} />
            </GalleryElement>
            {isOpenModalGallery && (
               <ModalWindow
                  onClose={this.onToggleModal}
                  isModalOpen={isOpenModalGallery}
                  largeImage={largeImageURL}
               />
            )}
         </>
      );
   }
}

// { isOpenModalGallery: !this.state.isOpenModalGallery }

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

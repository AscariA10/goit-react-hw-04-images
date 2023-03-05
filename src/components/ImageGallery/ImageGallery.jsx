import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';

import { Gallery } from './ImageGallery.styled';

export const ImageGallery = ({ galleryData, onClose, isModalOpen }) => {
   return (
      <Gallery>
         {galleryData.map(({ id, ...elementProps }) => {
            return (
               <ImageGalleryItem
                  key={id}
                  imageData={elementProps}
                  onClose={onClose}
                  isModalOpen={isModalOpen}
               />
            );
         })}
      </Gallery>
   );
};

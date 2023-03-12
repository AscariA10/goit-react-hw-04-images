import { useState } from 'react';
import { ModalWindow } from 'components/ModalWindow/ModalWindow';

import { GalleryElement, GalleryImage } from './ImageGalleryItem.styled';

export const ImageGalleryItem = props => {
   const { webformatURL, tags, largeImageURL } = props.imageData;
   const [isOpenModalGallery, setIsOpenModalGallery] = useState(false);

   function onToggleModal() {
      setIsOpenModalGallery(prevState => !prevState);
   }

   return (
      <>
         <GalleryElement onClick={onToggleModal}>
            <GalleryImage src={webformatURL} alt={tags} />
         </GalleryElement>
         {isOpenModalGallery && (
            <ModalWindow
               onClose={onToggleModal}
               isModalOpen={isOpenModalGallery}
               largeImage={largeImageURL}
            />
         )}
      </>
   );
};

// export class ImageGalleryItem extends Component {
//    state = {
//       isOpenModalGallery: false,
//    };

// onToggleModal = () => {
//    this.setState(prevState => {
//       return { isOpenModalGallery: !prevState.isOpenModalGallery };
//    });
// };

//    render() {
// const { webformatURL, tags, largeImageURL } = this.props.imageData;
// const { isOpenModalGallery } = this.state;
// return (
//    <>
//       <GalleryElement
//          onClick={() => {
//             this.onToggleModal();
//          }}
//       >
//          <GalleryImage src={webformatURL} alt={tags} onClick={this.getCurrentImage} />
//       </GalleryElement>
//       {isOpenModalGallery && (
//          <ModalWindow
//             onClose={this.onToggleModal}
//             isModalOpen={isOpenModalGallery}
//             largeImage={largeImageURL}
//          />
//       )}
//    </>
// );
//    }
// }

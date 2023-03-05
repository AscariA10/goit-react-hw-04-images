import { Component } from 'react';

import { createPortal } from 'react-dom';
import { Backdrop, Window } from './GalleryWindow.styled';

const modalRoot = document.querySelector('#modal-root');

export class GalleryWindow extends Component {
   componentDidMount() {
      window.addEventListener('keydown', event => {
         if (event.code === 'Escape') {
            this.props.onClose();
         }
      });
   }

   render() {
      const { onClose, largeImage } = this.props;
      console.log(largeImage);
      return createPortal(
         <Backdrop>
            <Window>
               <img src={largeImage} alt="" />
               <button
                  type="button"
                  onClick={() => {
                     onClose();
                  }}
               >
                  Close
               </button>
            </Window>
         </Backdrop>,
         modalRoot
      );
   }
}

// export const GalleryWindow = ({ onClose, largeImage }) => {
//    return createPortal(
//       <Backdrop>
//          <Window>
//             <img src={largeImage} alt="" />
//             <button
//                type="button"
//                onClick={() => {
//                   onClose();
//                }}
//             >
//                Close
//             </button>
//          </Window>
//       </Backdrop>,
//       modalRoot
//    );

//   <div class="overlay">
//      <div class="modal">
//         <img src="" alt="" />
//      </div>
//   </div>
// };

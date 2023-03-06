import { Component } from 'react';

import { createPortal } from 'react-dom';
import { Backdrop, Window } from './ModalWindow.styled';

const modalRoot = document.querySelector('#modal-root');

export class ModalWindow extends Component {
   componentDidMount() {
      window.addEventListener('keydown', this.onEscapeHandler);
   }

   componentWillUnmount() {
      window.removeEventListener('keydown', this.onEscapeHandler);
   }

   onEscapeHandler = event => {
      if (event.code === 'Escape') {
         this.props.onClose();
      }
   };

   onBackdropHandler = event => {
      if (event.currentTarget === event.target) {
         this.props.onClose();
      }
   };

   render() {
      const { onClose, largeImage } = this.props;

      return createPortal(
         <Backdrop onClick={this.onBackdropHandler}>
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

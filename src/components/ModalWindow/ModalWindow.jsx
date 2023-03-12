import { useEffect } from 'react';

import { createPortal } from 'react-dom';
import { Backdrop, Window } from './ModalWindow.styled';

const modalRoot = document.querySelector('#modal-root');

export const ModalWindow = props => {
   const { onClose, largeImage } = props;

   useEffect(() => {
      window.addEventListener('keydown', onEscapeHandler);
      return () => {
         window.removeEventListener('keydown', onEscapeHandler);
      };
   }, []);

   function onEscapeHandler(event) {
      if (event.code === 'Escape') {
         onClose();
      }
   }

   function onBackdropHandler(event) {
      if (event.currentTarget === event.target) {
         onClose();
      }
   }

   return createPortal(
      <Backdrop onClick={onBackdropHandler}>
         <Window>
            <img src={largeImage} alt="" />
            <button type="button" onClick={onClose}>
               Close
            </button>
         </Window>
      </Backdrop>,
      modalRoot
   );
};

// export class ModalWindow extends Component {
//    componentDidMount() {
//       window.addEventListener('keydown', this.onEscapeHandler);
//    }

//    componentWillUnmount() {
//       window.removeEventListener('keydown', this.onEscapeHandler);
//    }

// onEscapeHandler = event => {
//    if (event.code === 'Escape') {
//       this.props.onClose();
//    }
// };

// onBackdropHandler = event => {
//    if (event.currentTarget === event.target) {
//       this.props.onClose();
//    }
// };

//    render() {
//       const { onClose, largeImage } = this.props;

// return createPortal(
//    <Backdrop onClick={this.onBackdropHandler}>
//       <Window>
//          <img src={largeImage} alt="" />
//          <button
//             type="button"
//             onClick={() => {
//                onClose();
//             }}
//          >
//             Close
//          </button>
//       </Window>
//    </Backdrop>,
//    modalRoot
// );
//    }
// }

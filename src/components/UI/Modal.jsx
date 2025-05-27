import { createPortal } from 'react-dom';
import styles from './Modal.module.css'


const portalElements = document.createElement('div')
portalElements.id = 'overlays';
document.body.insertAdjacentElement('afterbegin', portalElements)

const Modal = (props) => {

   return (
      <>
         {createPortal(<div className={styles.backdrop} onClick={props.onOverlayClick}/>, portalElements)}
         {createPortal(
            <div className={styles.modal}>
                {props.children}
            </div>, 
         portalElements)}
      </>
   )
}

export default Modal;
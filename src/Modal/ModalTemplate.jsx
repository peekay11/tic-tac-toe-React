import React, { useContext } from 'react';
import ReactDOM from 'react-dom';
import { ModalBackdrop } from './Modal.styled';
import { ModalContext } from "../contexts/ModalContext";

function ModalTemplate() {
  const { handleModal, modalContent, modal } = useContext(ModalContext);

  if (modal) {
    return ReactDOM.createPortal(
      <ModalBackdrop onClick={handleModal}>
        {modalContent}
      </ModalBackdrop>,
      document.getElementById('modal-root')
    );
  }

  return null;
}

export default ModalTemplate;

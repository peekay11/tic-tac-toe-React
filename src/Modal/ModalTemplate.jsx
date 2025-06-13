import { useEffect } from "react";
import { createPortal } from "react-dom";
import { ModalOverlay, ModalContainer } from "./Modal.styled";

const ModalTemplate = ({ children, onClose }) => {
  useEffect(() => {
    console.log("ModalTemplate mounted"); // Debug log
    
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [onClose]);

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return createPortal(
    <ModalOverlay onClick={handleOverlayClick}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        {children}
      </ModalContainer>
    </ModalOverlay>,
    document.getElementById('modal-root')
  );
};

export default ModalTemplate;

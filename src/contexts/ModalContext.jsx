import React, { createContext, useState, useContext } from 'react';
import CustomModal from '../Modal/CustomModal';

export const ModalContext = createContext();

const ModalContextProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleModal = () => {
    if (!isOpen) {
      console.log('Opening modal with CustomModal component');
      setIsOpen(true);
    }
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <ModalContext.Provider value={{ isOpen, handleModal, closeModal }}>
      {children}
      {isOpen && <CustomModal />}
    </ModalContext.Provider>
  );
};

export default ModalContextProvider;
import React, { useContext } from 'react';
import styled from 'styled-components';
import { ModalContext } from '../../contexts/ModalContext';
import useSound from 'use-sound';
import clickSound from '../MusicPlayer/click.mp3';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  backdrop-filter: blur(5px);
  z-index: 1000;
  animation: fadeIn 0.3s ease-out;

  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
`;

const ModalContainer = styled.div`
  background-color: ${props => props.theme.colors.background};
  padding: 2.5rem;
  border-radius: 1rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  max-width: 500px;
  width: 90%;
  text-align: center;
  animation: scaleIn 0.3s ease-out;
  border: 2px solid ${props => props.theme.colors.secondary};
  position: relative;

  @keyframes scaleIn {
    from { transform: scale(0.8); }
    to { transform: scale(1); }
  }
`;

const ModalTitle = styled.h2`
  color: ${props => props.theme.colors.text};
  margin-bottom: 1.5rem;
  font-size: 2rem;
  font-family: 'Poppins', sans-serif;
  font-weight: 700;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const GameInstructions = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0 0 2rem 0;
  text-align: left;
  background-color: ${props => props.theme.colors.background};
  border-radius: 0.5rem;
  padding: 1rem;

  li {
    color: ${props => props.theme.colors.text};
    font-size: 1.2rem;
    margin-bottom: 1rem;
    display: flex;
    align-items: center;
    gap: 0.8rem;
    font-family: 'Poppins', sans-serif;
    line-height: 1.4;
    padding: 0.5rem;
    border-radius: 0.3rem;
    background-color: ${props => props.theme.colors.background};
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

    &:last-child {
      margin-bottom: 0;
    }

    &::before {
      content: "✅";
      font-size: 1.2rem;
      flex-shrink: 0;
    }
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 1rem;
`;

const CloseButton = styled.button`
  padding: 1rem 2rem;
  border: none;
  border-radius: 0.5rem;
  font-size: 1.1rem;
  cursor: pointer;
  transition: all 0.2s ease;
  font-family: 'Poppins', sans-serif;
  font-weight: 500;
  min-width: 140px;
  background-color: ${props => props.theme.colors.secondary};
  color: ${props => props.theme.colors.background};
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 8px rgba(0, 0, 0, 0.15);
  }

  &:active {
    transform: translateY(0);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
`;

function GuideModal() {
  const { closeModal } = useContext(ModalContext);
  const [playClick] = useSound(clickSound, { volume: 0.3 });

  const handleClose = () => {
    playClick();
    closeModal();
  };

  return (
    <ModalOverlay>
      <ModalContainer>
        <ModalTitle>How to Play Tic-Tac-Toe</ModalTitle>
        <GameInstructions>
          <li>Choose Your Marker – Player 1 is X, Player 2 is O.</li>
          <li>Take Turns – Players alternate placing their symbol.</li>
          <li>Win by Forming a Line – Get three symbols in a row!</li>
          <li>Watch for Draws – If all squares fill up, it's a tie.</li>
          <li>Restart & Improve – Play again and outsmart your opponent!</li>
        </GameInstructions>
        <ButtonContainer>
          <CloseButton onClick={handleClose}>Close</CloseButton>
        </ButtonContainer>
      </ModalContainer>
    </ModalOverlay>
  );
}

export default GuideModal; 
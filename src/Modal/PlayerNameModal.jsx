import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { GameContext } from '../contexts/GameContext';
import { ModalContext } from '../contexts/ModalContext';
import useSound from 'use-sound';
import clickSound from '../components/MusicPlayer/click.mp3';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(3px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  opacity: 0;
  animation: fadeIn 0.4s forwards;

  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
`;

const ModalContainer = styled.div`
  background-color: ${props => props.theme.colors.background};
  padding: 2rem;
  border-radius: 1rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  width: 90%;
  text-align: center;
  animation: scaleIn 0.3s ease-out;
  border: 2px solid ${props => props.theme.colors.secondary};
`;

const ModalTitle = styled.h2`
  color: ${props => props.theme.colors.text};
  margin-bottom: 1.5rem;
  font-size: 1.5rem;
`;

const InputContainer = styled.div`
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  display: block;
  color: ${props => props.theme.colors.text};
  margin-bottom: 0.5rem;
  text-align: left;
  font-size: 1rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.8rem;
  border: 2px solid ${props => props.theme.colors.secondary};
  border-radius: 0.5rem;
  font-size: 1rem;
  background-color: ${props => props.theme.colors.background};
  color: ${props => props.theme.colors.text};
  transition: border-color 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
`;

const BaseButton = styled.button`
  padding: 0.8rem 1.5rem;
  border: none;
  border-radius: 0.5rem;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.2s ease;
  font-family: 'Poppins', sans-serif;
  font-weight: 500;
  min-width: 120px;

  &:hover {
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }
`;

const StartButton = styled(BaseButton)`
  background-color: ${props => props.theme.colors.secondary};
  color: ${props => props.theme.colors.background};
`;

const SkipButton = styled(BaseButton)`
  background-color: ${props => props.theme.colors.primary};
  color: ${props => props.theme.colors.background};
`;

function PlayerNameModal() {
  const { game, setGame } = useContext(GameContext);
  const { closeModal } = useContext(ModalContext);
  const [playClick] = useSound(clickSound, { volume: 0.3 });
  const [player1Name, setPlayer1Name] = useState(game.player1.name);
  const [player2Name, setPlayer2Name] = useState(game.player2.name);

  const handleStart = () => {
    playClick();
    setGame(prev => ({
      ...prev,
      player1: { ...prev.player1, name: player1Name || 'Player 1' },
      player2: { ...prev.player2, name: player2Name || 'Player 2' }
    }));
    closeModal();
  };

  const handleSkip = () => {
    playClick();
    closeModal();
  };

  return (
    <ModalOverlay>
      <ModalContainer>
        <ModalTitle>Enter Player Names</ModalTitle>
        <InputContainer>
          <Label>Player 1 (X)</Label>
          <Input
            type="text"
            value={player1Name}
            onChange={(e) => setPlayer1Name(e.target.value)}
            placeholder="Enter Player 1 name"
          />
        </InputContainer>
        <InputContainer>
          <Label>Player 2 (O)</Label>
          <Input
            type="text"
            value={player2Name}
            onChange={(e) => setPlayer2Name(e.target.value)}
            placeholder="Enter Player 2 name"
          />
        </InputContainer>
        <ButtonContainer>
          <StartButton onClick={handleStart}>Start Game</StartButton>
          <SkipButton onClick={handleSkip}>Skip</SkipButton>
        </ButtonContainer>
      </ModalContainer>
    </ModalOverlay>
  );
}

export default PlayerNameModal; 
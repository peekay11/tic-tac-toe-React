import React, { useContext, useEffect } from 'react';
import styled from 'styled-components';
import Button from '../components/Button/Button';
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
  margin-bottom: 1rem;
  font-size: 1.5rem;
`;

const ScoreText = styled.p`
  color: ${props => props.theme.colors.text};
  margin-bottom: 1.5rem;
  font-size: 1.1rem;
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

const ContinueButton = styled(BaseButton)`
  background-color: ${props => props.theme.colors.secondary};
  color: ${props => props.theme.colors.background};
`;

const ResetButton = styled(BaseButton)`
  background-color: ${props => props.theme.colors.primary};
  color: ${props => props.theme.colors.background};
`;

function CustomModal() {
  const { game, setGame } = useContext(GameContext);
  const { closeModal } = useContext(ModalContext);

  const [playClick] = useSound(clickSound, { volume: 0.3 });

  useEffect(() => { playClick(); }, [playClick]);

  const handleContinue = () => {
    playClick();
    setGame(prev => ({ ...prev, board: Array(9).fill(null), winner: null, gameOver: false, currentPlayer: 'x' }));
    closeModal();
  };

  const handleReset = () => {
    playClick();
    setGame({
      player1: { name: 'Player 1', score: 0, symbol: 'x' },
      player2: { name: 'Player 2', score: 0, symbol: 'o' },
      winner: null,
      board: Array(9).fill(null),
      currentPlayer: 'x',
      gameOver: false
    });
    closeModal();
    window.location.reload();
  };

  return (
    <ModalOverlay>
      <ModalContainer>
        <ModalTitle>
          {game.winner === 'x' ? `${game.player1.name} Won!` : 
           game.winner === 'o' ? `${game.player2.name} Won!` : 
           game.winner === 'draw' ? "It's a Draw!" : "Game Over!"}
        </ModalTitle>
        <ScoreText>
          {`${game.player1.name}: ${game.player1.score}`}
        </ScoreText>
        <ScoreText>
          {`${game.player2.name}: ${game.player2.score}`}
        </ScoreText>
        <ButtonContainer>
          <ContinueButton onClick={handleContinue}>Continue</ContinueButton>
          <ResetButton onClick={handleReset}>Reset Game</ResetButton>
        </ButtonContainer>
      </ModalContainer>
    </ModalOverlay>
  );
}

export default CustomModal;

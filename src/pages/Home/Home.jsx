import React, { useContext } from "react";
import { Container, Subtitle, Title } from "../../styles/General.styled";
import Header from "../../components/Header/Header";
import { ThemeContext } from "../../contexts/ThemeContext";
import { GameContext } from "../../contexts/GameContext";
import Button from "../../components/Button/Button";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { ModalContext } from "../../contexts/ModalContext";
import GuideModal from "../../components/GuideModal/GuideModal";
import useSound from 'use-sound';
import clickSound from '../../components/MusicPlayer/click.mp3';

const VersionContainer = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 1000;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const HelpContainer = styled.div`
  position: fixed;
  bottom: 20px;
  left: 20px;
  z-index: 1000;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const VersionTitle = styled.h3`
  color: ${props => props.theme.colors.text};
  font-size: 1.2rem;
  margin: 0;
  font-family: 'Poppins', sans-serif;
`;

const HelpTitle = styled.h3`
  color: ${props => props.theme.colors.text};
  font-size: 1.2rem;
  margin: 0;
  font-family: 'Poppins', sans-serif;
`;

const IconButton = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: none;
  background-color: ${props => props.theme.colors.secondary};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.2s ease;

  &:hover {
    transform: scale(1.1);
  }

  svg {
    width: 20px;
    height: 20px;
    fill: ${props => props.theme.colors.background};
  }
`;

const HelpButton = styled(IconButton)`
  background-color: ${props => props.theme.colors.primary};
`;

const V1Icon = () => (
  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
  </svg>
);

const QuestionIcon = () => (
  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z"/>
  </svg>
);

export default function Home() {
  const { theme } = useContext(ThemeContext);
  const { setGame } = useContext(GameContext);
  const { openModal } = useContext(ModalContext);
  const navigate = useNavigate();
  const [playClick] = useSound(clickSound, { volume: 0.3 });

  const handlePlayNow = () => {
    // Reset game state before starting
    setGame({
      player1: { name: 'Player 1', score: 0, symbol: 'x' },
      player2: { name: 'Player 2', score: 0, symbol: 'o' },
      winner: null,
      board: Array(9).fill(null),
      currentPlayer: 'x',
      gameOver: false
    });
    navigate("/game-on");
  };

  const handleV1Click = () => {
    window.open('https://your-v1-tictactoe-link.com', '_blank');
  };

  const handleHelpClick = () => {
    playClick();
    openModal(<GuideModal />);
  };

  return (
    <Container>
      {/* Optional: Uncomment if Header is in use */}
      {/* <Header /> */}

      <Title>Tic Tac Toe</Title>
      <Subtitle>Play with your friends, higher score wins</Subtitle>
      <Button onClick={handlePlayNow}>Play Now</Button>
      <VersionContainer>
        <VersionTitle>V1</VersionTitle>
        <IconButton onClick={handleV1Click}>
          <V1Icon />
        </IconButton>
      </VersionContainer>
      <HelpContainer>
        <HelpButton onClick={handleHelpClick}>
          <QuestionIcon />
        </HelpButton>
      </HelpContainer>
    </Container>
  );
}

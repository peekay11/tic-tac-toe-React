import React, { useContext } from "react";
import { Container, Subtitle, Title } from "../../styles/General.styled";
import Header from "../../components/Header/Header";
import { ThemeContext } from "../../contexts/ThemeContext";
import { GameContext } from "../../contexts/GameContext";
import Button from "../../components/Button/Button";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const VersionContainer = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
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

const VersionButton = styled.button`
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

  img {
    width: 20px;
    height: 20px;
  }
`;

export default function Home() {
  const { theme } = useContext(ThemeContext);
  const { setGame } = useContext(GameContext);
  const navigate = useNavigate();

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

  return (
    <Container>
      {/* Optional: Uncomment if Header is in use */}
      {/* <Header /> */}

      <Title>Tic Tac Toe</Title>
      <Subtitle>Play with your friends, higher score wins</Subtitle>
      <Button onClick={handlePlayNow}>Play Now</Button>
      <VersionContainer>
        <VersionTitle>V1</VersionTitle>
        <VersionButton onClick={handleV1Click}>
          <img src="v1.svg" alt="V1" />
        </VersionButton>
      </VersionContainer>
    </Container>
  );
}

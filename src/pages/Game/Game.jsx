// src/pages/Game/Game.jsx
import React, { useContext } from "react";
import { Container, Title } from "../../styles/General.styled";
import { GameContext } from "../../contexts/GameContext";
import { ModalContext } from "../../contexts/ModalContext";
import GuideModal from "../../components/GuideModal/GuideModal";
import styled from "styled-components";
import useSound from "use-sound";
import clickSound from "../../components/MusicPlayer/click.mp3";
import MusicPlay from "../../components/MusicPlayer/MusicPlay";

import iconX from "../../assets/svgs/icon-x.svg";
import iconO from "../../assets/svgs/icon-o.svg";
import iconXOutline from "../../assets/svgs/icon-x-outline.svg";
import iconOOutline from "../../assets/svgs/icon-o-outline.svg";

const GameContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  flex-wrap: wrap;

  @media (max-width: 600px) {
    flex-direction: column;
    gap: 1.5rem;
  }
`;

const ScoreBoard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: ${(props) => props.theme.colors.background};
  border: 2px solid ${(props) => props.theme.colors.secondary};
  border-radius: 1rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 1rem;
  min-width: 160px;
  max-width: 220px;
  width: 100%;
  box-sizing: border-box;

  @media (max-width: 600px) {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 90%;
    max-width: none;
    padding: 0.75rem 1rem;
  }
`;

const PlayerScore = styled.div`
  padding: 1rem;
  background-color: ${(props) =>
    props.isActive ? props.theme.colors.secondary : "transparent"};
  border-radius: 0.75rem;
  transition: all 0.3s ease;
  box-shadow: ${(props) =>
    props.isActive ? "0 4px 8px rgba(0, 0, 0, 0.2)" : "none"};
  transform: ${(props) => (props.isActive ? "scale(1.05)" : "scale(1)")};
  width: 100%;
  box-sizing: border-box;

  h3 {
    margin: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;
    font-family: 'Poppins', sans-serif;
    font-size: 1rem;

    span {
      flex: 1;
      font-weight: 600;
      text-align: left;
      color: ${(props) =>
        props.isActive ? props.theme.colors.primary : props.theme.colors.text};
      word-break: break-word;
    }

    p {
      margin: 0;
      padding: 0.4rem 0.75rem;
      background: ${(props) =>
        props.isActive ? "rgba(255,255,255,0.1)" : "transparent"};
      border-radius: 0.5rem;
      font-size: 1.8rem;
      font-weight: bold;
      color: ${(props) =>
        props.isActive ? props.theme.colors.primary : props.theme.colors.text};
      text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

      @media (max-width: 600px) {
        font-size: 1.4rem;
      }
    }
  }
`;

const Board = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  max-width: 400px;
  width: 100%;
  aspect-ratio: 1;
  padding: 1rem;
  background-color: ${(props) => props.theme.colors.secondary};
  border-radius: 1rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    max-width: 300px;
    padding: 0.5rem;
    gap: 0.5rem;
  }
`;

const Cell = styled.button`
  border: none;
  width: 100%;
  aspect-ratio: 1;
  background-color: ${(props) => props.theme.colors.secondary};
  border-radius: 1rem;
  cursor: pointer;
  transition: transform 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  img {
    width: 60%;
    height: 60%;
    object-fit: contain;
  }

  .markedItem {
    filter: ${(props) =>
      `invert(${props.theme.colors.primary === "#ffffff" ? "1" : "0"})`};
  }

  .outlineIcon {
    opacity: 0.5;
    transition: opacity 0.3s ease;
  }

  &:hover:not(:disabled) {
    transform: scale(1.05);

    .outlineIcon {
      opacity: 1;
    }
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.8;
  }
`;

const HelpContainer = styled.div`
  position: fixed;
  bottom: 20px;
  left: 20px;
  z-index: 1000;
`;

const IconButton = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: none;
  background-color: ${(props) => props.theme.colors.primary};
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
    fill: ${(props) => props.theme.colors.background};
  }
`;

const QuestionIcon = () => (
  <svg viewBox="0 0 24 24">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z" />
  </svg>
);

export default function Game() {
  const { game, updateBoard } = useContext(GameContext);
  const { openModal } = useContext(ModalContext);
  const [playClick] = useSound(clickSound, { volume: 0.3 });

  const handleHelpClick = () => {
    playClick();
    openModal(<GuideModal />);
  };

  if (!game) {
    return (
      <Container>
        <Title>Loading...</Title>
      </Container>
    );
  }

  return (
    <Container>
      <MusicPlay />
      <Title>Tic Tac Toe</Title>
      <GameContainer>
        <ScoreBoard>
          <PlayerScore isActive={game.currentPlayer === "x"}>
            <h3>
              <span>{game.player1.name}</span>
              <p>{game.player1.score}</p>
            </h3>
          </PlayerScore>
        </ScoreBoard>

        <Board>
          {game.board.map((cell, index) => (
            <Cell
              key={index}
              onClick={() => updateBoard(index)}
              disabled={cell || game.gameOver}
            >
              {cell === "x" ? (
                <img src={iconX} alt="X" className="markedItem" />
              ) : cell === "o" ? (
                <img src={iconO} alt="O" className="markedItem" />
              ) : game.currentPlayer === "x" ? (
                <img
                  src={iconXOutline}
                  alt="X outline"
                  className="outlineIcon"
                />
              ) : (
                <img
                  src={iconOOutline}
                  alt="O outline"
                  className="outlineIcon"
                />
              )}
            </Cell>
          ))}
        </Board>

        <ScoreBoard>
          <PlayerScore isActive={game.currentPlayer === "o"}>
            <h3>
              <span>{game.player2.name}</span>
              <p>{game.player2.score}</p>
            </h3>
          </PlayerScore>
        </ScoreBoard>
      </GameContainer>

      <HelpContainer>
        <IconButton onClick={handleHelpClick}>
          <QuestionIcon />
        </IconButton>
      </HelpContainer>
    </Container>
  );
}

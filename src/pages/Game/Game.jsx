// src/pages/Game/Game.jsx
import React, { useContext } from "react";
import { Container, Title } from "../../styles/General.styled";
import { GameBoardStyle } from "./Game.styled";
import { GameContext } from "../../contexts/GameContext";
import GameCell from "../../GameCell/GameCell";
import MusicPlay from "../../components/MusicPlayer/MusicPlay";

function Game() {
  const { game } = useContext(GameContext);

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
      <GameBoardStyle>
        {game.board.map((cell, index) => (
          <GameCell key={index} cellItem={cell} index={index} />
        ))}
      </GameBoardStyle>
    </Container>
  );
}

export default Game;

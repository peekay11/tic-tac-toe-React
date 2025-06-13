import React, { useContext, useEffect } from 'react';
import styled from 'styled-components';
import { GameContext } from '../../contexts/GameContext';
import { ModalContext } from '../../contexts/ModalContext';
import { ThemeContext } from '../../contexts/ThemeContext';
import PlayerScore from '../PlayerScore/PlayerScore';
import { XIcon, OIcon } from '../Icons/Icons';
import PlayerNameModal from '../../Modal/PlayerNameModal';

// ... existing styled components ...

function Game() {
  const { game, updateBoard } = useContext(GameContext);
  const { openModal } = useContext(ModalContext);
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    // Show player name modal when game starts
    openModal(<PlayerNameModal />);
  }, []); // Only run once when component mounts

  const handleCellClick = (index) => {
    updateBoard(index);
  };

  return (
    <GameContainer>
      <PlayerScore
        name={game.player1.name}
        score={game.player1.score}
        isActive={game.currentPlayer === 'x'}
        position="left"
      />
      <GameBoard>
        {game.board.map((cell, index) => (
          <Cell
            key={index}
            onClick={() => handleCellClick(index)}
            $isActive={!game.gameOver && !cell}
          >
            {cell === 'x' && <XIcon />}
            {cell === 'o' && <OIcon />}
          </Cell>
        ))}
      </GameBoard>
      <PlayerScore
        name={game.player2.name}
        score={game.player2.score}
        isActive={game.currentPlayer === 'o'}
        position="right"
      />
    </GameContainer>
  );
}

export default Game; 
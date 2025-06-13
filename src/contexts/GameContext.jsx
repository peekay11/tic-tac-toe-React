import React, { createContext, useState, useContext, useCallback } from "react";
import { ModalContext } from "./ModalContext";
import { checkForWinner } from "../Utils/index";
import useSound from "use-sound";
import clickSound from "../components/MusicPlayer/click.mp3";

// Initialize with default values
const defaultGameState = {
  player1: { name: 'Player 1', score: 0, symbol: 'x' },
  player2: { name: 'Player 2', score: 0, symbol: 'o' },
  winner: null,
  board: Array(9).fill(null),
  currentPlayer: 'x',
  gameOver: false
};

export const GameContext = createContext({
  game: defaultGameState,
  setGame: () => {},
  turn: 'x',
  resetBoard: () => {},
  resetGame: () => {},
  updateBoard: () => {},
  setTurn: () => {}
});

export const GameContextProvider = ({ children }) => {
  const initialBoard = Array(9).fill(null);
  const { handleModal } = useContext(ModalContext);
  const [playClick] = useSound(clickSound, { volume: 0.3 });

  const [game, setGame] = useState(defaultGameState);
  const [turn, setTurn] = useState('x');

  const updateBoard = useCallback((index) => {
    const { board, currentPlayer, gameOver } = game;

    // Don't allow moves if game is over or cell is already taken
    if (gameOver || board[index] !== null) return;

    playClick(); // Play sound on valid move
    const updatedBoard = [...board];
    updatedBoard[index] = currentPlayer;

    // Check for winner after updating the board
    const winner = checkForWinner(updatedBoard);

    if (winner) {
      // Update score for the winning player
      const winningPlayer = currentPlayer === 'x' ? 'player1' : 'player2';
      console.log("Winner is:", game[winningPlayer].name); // Debug log
      
      setGame(prevGame => ({
        ...prevGame,
        board: updatedBoard,
        winner,
        gameOver: true,
        [winningPlayer]: {
          ...prevGame[winningPlayer],
          score: prevGame[winningPlayer].score + 1
        }
      }));

      // Show modal after a short delay
      setTimeout(() => {
        if (handleModal) {
          handleModal();
        }
      }, 500);
    } else if (updatedBoard.every(cell => cell !== null)) {
      // It's a draw
      setGame(prevGame => ({
        ...prevGame,
        board: updatedBoard,
        winner: 'draw',
        gameOver: true
      }));

      // Show modal after a short delay
      setTimeout(() => {
        if (handleModal) {
          handleModal();
        }
      }, 500);
    } else {
      // Update board and switch turns
      setGame(prevGame => ({
        ...prevGame,
        board: updatedBoard,
        currentPlayer: currentPlayer === 'x' ? 'o' : 'x',
      }));
    }
  }, [game, handleModal, playClick]);

  const resetBoard = useCallback(() => {
    setGame(prev => ({
      ...prev,
      board: initialBoard,
      winner: null,
      gameOver: false,
      currentPlayer: 'x'
    }));
    setTurn('x');
  }, []);

  const resetGame = useCallback(() => {
    setGame(defaultGameState);
    setTurn('x');
  }, []);

  return (
    <GameContext.Provider value={{
      game,
      setGame,
      turn,
      setTurn,
      updateBoard,
      resetBoard,
      resetGame
    }}>
      {children}
    </GameContext.Provider>
  );
};

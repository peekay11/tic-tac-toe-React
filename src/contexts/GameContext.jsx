import React, {
  createContext,
  useState,
  useCallback,
  useContext,
  useEffect,
} from "react";
import useSound from "use-sound";
import clickSound from "../components/MusicPlayer/click.mp3";
import { ModalContext } from "./ModalContext";
import CustomModal from "../Modal/CustomModal";

export const GameContext = createContext();

const createInitialGameState = () => ({
  player1: { name: "Player 1", score: 0, symbol: "x" },
  player2: { name: "Player 2", score: 0, symbol: "o" },
  winner: null,
  board: Array(9).fill(null),
  currentPlayer: "x",
  gameOver: false,
  modalOpened: false,
});

export function GameContextProvider({ children }) {
  const { openModal, closeModal } = useContext(ModalContext);
  const [playClick] = useSound(clickSound, { volume: 0.3 });
  const [game, setGame] = useState(createInitialGameState());

  const checkWinner = useCallback((board) => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6],
    ];
    for (const [a, b, c] of lines) {
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }
    return null;
  }, []);

  const updateBoard = useCallback(
    (index) => {
      setGame((prev) => {
        if (prev.board[index] || prev.gameOver || prev.modalOpened) return prev;

        playClick();
        const newBoard = [...prev.board];
        newBoard[index] = prev.currentPlayer;

        const winner = checkWinner(newBoard);
        const isDraw = !winner && newBoard.every((cell) => cell !== null);

        const updatedGame = {
          ...prev,
          board: newBoard,
          currentPlayer: prev.currentPlayer === "x" ? "o" : "x",
          gameOver: Boolean(winner || isDraw),
          winner: winner || (isDraw ? "draw" : null),
          modalOpened: false,
        };

        if (winner === "x") {
          updatedGame.player1 = {
            ...prev.player1,
            score: prev.player1.score + 1,
          };
        } else if (winner === "o") {
          updatedGame.player2 = {
            ...prev.player2,
            score: prev.player2.score + 1,
          };
        }

        return updatedGame;
      });
    },
    [checkWinner, playClick]
  );

  const resetBoard = useCallback(() => {
    setGame((prev) => ({
      ...prev,
      board: Array(9).fill(null),
      currentPlayer: "x",
      winner: null,
      gameOver: false,
      modalOpened: false,
    }));
  }, []);

  const resetGame = useCallback(() => {
    setGame(createInitialGameState());
  }, []);

  useEffect(() => {
    if (!game.gameOver || game.modalOpened) return;

    const modalTimeout = setTimeout(() => {
      openModal(
        <CustomModal
          winner={game.winner}
          onReset={() => {
            resetBoard();
            closeModal();
          }}
          onQuit={() => {
            resetGame();
            closeModal();
          }}
        />
      );

      setGame((prev) => ({
        ...prev,
        modalOpened: true,
      }));
    }, 500);

    return () => clearTimeout(modalTimeout);
  }, [game, openModal, closeModal, resetBoard, resetGame]);

  return (
    <GameContext.Provider
      value={{ game, setGame, updateBoard, resetBoard, resetGame }}
    >
      {children}
    </GameContext.Provider>
  );
}

import { useContext } from "react";
import { GameContext } from "../contexts/GameContext";
import { ModalContext } from "../contexts/ModalContext";
import { ModalTitle, ModalBody, ModalFooter, ModalButton } from "./Modal.styled";

const RoundOverModal = ({ winner }) => {
  const gameContext = useContext(GameContext);
  const { closeModal } = useContext(ModalContext);

  const handleContinue = () => {
    gameContext.resetBoard();
    closeModal();
  };

  const handleRestart = () => {
    gameContext.resetGame();
    closeModal();
  };

  return (
    <>
      <ModalTitle>
        {winner === "Draw" ? "Game Draw!" : `${winner} Wins!`}
      </ModalTitle>
      <ModalBody>
        <p>Current Scores:</p>
        <p>{gameContext.game.player1.name}: {gameContext.game.player1.score}</p>
        <p>{gameContext.game.player2.name}: {gameContext.game.player2.score}</p>
      </ModalBody>
      <ModalFooter>
        <ModalButton onClick={handleContinue}>Continue</ModalButton>
        <ModalButton onClick={handleRestart}>Restart</ModalButton>
      </ModalFooter>
    </>
  );
};

export default RoundOverModal;

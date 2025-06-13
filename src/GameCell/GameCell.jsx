import React, { useContext } from 'react';
import { CellStyle } from './GameCell.styled';
import { GameContext } from '../../contexts/GameContext';
import { checkForWinner } from '../../utils/GameUtils';
import { ReactComponent as IconX } from '../assets/svgs/icon-x.svg';
import { ReactComponent as IconO } from '../assets/svgs/icon-o.svg';
import { ReactComponent as XIconOutline } from '../assets/svgs/icon-x-outline.svg';
import { ReactComponent as OIconOutline } from '../assets/svgs/icon-o-outline.svg';
import RoundOverModal from '../Modal/RoundOverModal';

function GameCell({ cellItem, index }) {
  const { game, updateBoard } = useContext(GameContext);

  const cellClickHandler = () => {
    updateBoard(index);
    // Assuming checkForWinner returns a boolean or a string indicating the winner
    const winner = checkForWinner(game.board);
    // You might want to handle the winner here, e.g., show a modal
    if (winner) {
      // Show RoundOverModal or handle it as needed
      // <RoundOverModal />
    }
  };

  if (cellItem === 'x') {
    return (
      <CellStyle>
        <IconX className="markedItem" />
      </CellStyle>
    );
  } else if (cellItem === 'o') {
    return (
      <CellStyle>
        <IconO className="markedItem" />
      </CellStyle>
    );
  }

  return (
    <CellStyle onClick={cellClickHandler}>
      {game.turn === 'x' ? (
        <XIconOutline className="outlineIcon" />
      ) : (
        <OIconOutline className="outlineIcon" />
      )}
    </CellStyle>
  );
}

export default GameCell;
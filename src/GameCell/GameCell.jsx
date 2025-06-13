import React, { useContext } from 'react';
import { CellStyle } from './GameCell.styled';
import { GameContext } from '../contexts/GameContext';
import useSound from 'use-sound';
import clickSound from '../components/MusicPlayer/click.mp3';

// Import SVGs as URLs
import iconX from '../assets/svgs/icon-x.svg';
import iconO from '../assets/svgs/icon-o.svg';
import iconXOutline from '../assets/svgs/icon-x-outline.svg';
import iconOOutline from '../assets/svgs/icon-o-outline.svg';

function GameCell({ cellItem, index }) {
  const { game, updateBoard } = useContext(GameContext);
  const [playClick] = useSound(clickSound, { volume: 0.3 });

  const cellClickHandler = () => {
    playClick();
    updateBoard(index);
  };

  if (cellItem === 'x') {
    return (
      <CellStyle>
        <img src={iconX} alt="X" className="markedItem" />
      </CellStyle>
    );
  } else if (cellItem === 'o') {
    return (
      <CellStyle>
        <img src={iconO} alt="O" className="markedItem" />
      </CellStyle>
    );
  }

  return (
    <CellStyle onClick={cellClickHandler}>
      {game.turn === 'x' ? (
        <img src={iconXOutline} alt="X outline" className="outlineIcon" />
      ) : (
        <img src={iconOOutline} alt="O outline" className="outlineIcon" />
      )}
    </CellStyle>
  );
}

export default GameCell;
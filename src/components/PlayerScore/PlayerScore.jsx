import React from 'react';
import styled from 'styled-components';
import { ThemeContext } from '../../contexts/ThemeContext';

const ScoreContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: ${props => props.position === 'left' ? 'flex-start' : 'flex-end'};
  padding: 1rem;
  background-color: ${props => props.theme.colors.background};
  border-radius: 1rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  min-width: 150px;
  transition: all 0.3s ease;
  border: 2px solid ${props => props.$isActive ? props.theme.colors.secondary : 'transparent'};
  transform: ${props => props.$isActive ? 'scale(1.05)' : 'scale(1)'};
`;

const PlayerName = styled.h3`
  color: ${props => props.theme.colors.text};
  margin: 0;
  font-size: 1.2rem;
  font-weight: 500;
`;

const Score = styled.div`
  color: ${props => props.theme.colors.text};
  font-size: 2rem;
  font-weight: bold;
  margin-top: 0.5rem;
`;

function PlayerScore({ name, score, isActive, position }) {
  return (
    <ScoreContainer position={position} $isActive={isActive}>
      <PlayerName>{name}</PlayerName>
      <Score>{score}</Score>
    </ScoreContainer>
  );
}

export default PlayerScore; 
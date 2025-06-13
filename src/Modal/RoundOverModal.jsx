import React, { useContext } from 'react';
import { Title, Subtitle } from '../../styles/General.style';
import { ModalHeader, ModalBody, ModalFooter } from '../../Modal';
import Button from '../../Button/Button';
import { GameContext } from '../../contexts/GameContext';
import { ModalContext } from '../../contexts/ModalContext';

function RoundOverModal() {
  const { resetBoard } = useContext(GameContext);
  const { handModal } = useContext(ModalContext);

  return (
    <>
      <ModalHeader>
        <Title primary>Akhil Wins Round</Title>
      </ModalHeader>
      <ModalBody>
        <Subtitle primary>Choices will be switched now.</Subtitle>
        <Subtitle primary>Akhil: 1</Subtitle>
        <Subtitle primary>Harjot: 1</Subtitle>
      </ModalBody>
      <ModalFooter>
        <Button
          color="#F9C81B"
          onClick={() => {
            handModal();
            resetBoard();
          }}
        >
          Continue
        </Button>
        <Button color="#8437F9">Restart</Button>
      </ModalFooter>
    </>
  );
}

export default RoundOverModal;

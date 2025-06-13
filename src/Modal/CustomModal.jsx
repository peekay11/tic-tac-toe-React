import React from "react";
import styled, { useTheme } from "styled-components";
import { useNavigate } from "react-router-dom";

const ModalContainer = styled.div`
  background: ${({ theme }) => theme.colors.primary};
  padding: 2rem 3rem;
  border-radius: 12px;
  text-align: center;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  max-width: 400px;
  width: 90%;
  margin: 0 auto;

  @media (max-width: 480px) {
    padding: 1.5rem 1rem;
    max-width: 95%;
  }
`;

const Title = styled.h2`
  font-size: 2.5rem;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 1rem;

  @media (max-width: 480px) {
    font-size: 1.75rem;
  }
`;

const ButtonGroup = styled.div`
  margin-top: 2rem;
  display: flex;
  gap: 1rem;
  justify-content: center;

  @media (max-width: 480px) {
    flex-direction: column;
    gap: 0.75rem;
  }
`;

const Button = styled.button`
  padding: 0.75rem 2rem;
  background-color: ${({ theme }) => theme.colors.text};
  border: none;
  border-radius: 8px;
  color: ${({ theme }) => theme.colors.primary};
  font-size: 1.1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors.secondary};
    color: ${({ theme }) => theme.colors.primary};
  }

  @media (max-width: 480px) {
    padding: 0.5rem 1rem;
    font-size: 0.9rem;
  }
`;

const BottomLeftSvg = styled.svg`
  position: fixed;
  bottom: 10px;
  left: 10px;
  width: 50px;
  height: 50px;
  fill: ${({ theme }) => theme.colors.text};
  filter: ${({ theme }) => (theme.name === "dark" ? "invert(1)" : "invert(0)")};

  @media (max-width: 480px) {
    width: 30px;
    height: 30px;
    bottom: 5px;
    left: 5px;
  }
`;

const CustomModal = ({ winner, onReset, onClose }) => {
  const navigate = useNavigate();
  const theme = useTheme();

  const winnerText =
    winner === "draw"
      ? "It's a Draw!"
      : winner
      ? `${winner.toUpperCase()} Wins!`
      : "Game Over";

  const handleQuit = () => {
    if (onClose) onClose();
    navigate("/"); // navigate home
  };

  return (
    <>
      <ModalContainer>
        <Title>{winnerText}</Title>

        <ButtonGroup>
          <Button onClick={onReset}>Play Again</Button>
          <Button onClick={handleQuit}>Quit</Button>
        </ButtonGroup>
      </ModalContainer>

      
      <BottomLeftSvg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 64 64"
        aria-hidden="true"
      >
        <circle cx="32" cy="32" r="30" />
      </BottomLeftSvg>
    </>
  );
};

export default CustomModal;

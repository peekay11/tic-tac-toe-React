import styled from "styled-components";

export const GameBoardStyle = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  margin: 2rem auto;
  max-width: 400px;
  width: 100%;
  aspect-ratio: 1;
  padding: 1rem;
  background-color: ${props => props.theme.colors.secondary};
  border-radius: 1rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    max-width: 300px;
    gap: 0.5rem;
    padding: 0.5rem;
  }
`;

import styled from "styled-components";

export const CellStyle = styled.button`
  border: none;
  width: 100%;
  aspect-ratio: 1;
  padding: 1rem;
  font-size: 3rem;
  border-radius: 1rem;
  cursor: pointer;
  background-color: ${(props) => props.theme.colors.secondary};
  color: ${(props) => props.theme.colors.primary};
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 60%;
    height: 60%;
    object-fit: contain;
  }

  .markedItem {
    filter: ${(props) => `invert(${props.theme.colors.primary === '#ffffff' ? '1' : '0'})`};
  }

  .outlineIcon {
    opacity: 0.5;
    transition: opacity 0.3s ease;
  }

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 6px 8px rgba(0, 0, 0, 0.2);

    .outlineIcon {
      opacity: 1;
    }
  }
`;

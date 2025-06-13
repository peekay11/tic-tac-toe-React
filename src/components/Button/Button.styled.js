import styled from "styled-components";

export const ButtonWrapper = styled.button`
  color: ${(props) => props.theme.colors.primary};
  background-color: ${(props) => props.theme.colors.secondary};
  padding: 20px 30px;
  min-width: 300px;
  font-size: 1.5rem;
  font-weight: 400;
  margin: 20px;
  border: none;
  border-radius: 10px;
  cursor: pointer;

  &:hover {
    box-shadow: 0px 0px 10px grey;
  }
`;

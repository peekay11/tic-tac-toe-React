import styled from "styled-components";

export const CellStyle = styled.button`
  border: none;
  width: 10rem;
  height: 10rem;
  padding: 3rem;
  font-size: 3rem;
  border-radius: 2.5rem;
  cursor: pointer;
  background-color: ${(props) => props.theme.colors.secondary};
  color: ${(props) => props.theme.colors.primary};
  box-shadow: 5px 10px ${(props) => props.theme.colors.cream};
.markedItem{
path{

 fill: ${(props) => props.theme.colors.primary};

}}
  .outlineIcon {
    path {
      stroke: ${(props) => props.theme.colors.primary};
      stroke-width: 0;
    }
  }
    &:hover{
    .outline{
       path {
      stroke: ${(props) => props.theme.colors.primary};
      stroke-width: 2;
    }
    }
    
    }
`;

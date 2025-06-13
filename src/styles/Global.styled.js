import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    $(props)=>props.theme.media.mobile{
font-size:11px;
    }
  }

  body {
    background-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.text};
    font-family: 'Poppins', sans-serif;
    font-weight: 400;
    transition: background-color 0.3s ease, color 0.3s ease;
  }
`;

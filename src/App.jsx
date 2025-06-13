// src/App.jsx
import React, { useContext } from 'react';
import Router from './Router';
import { GlobalStyles } from './styles/Global.styled';
import { ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme } from './styles/theme';
import { ThemeContext } from './contexts/ThemeContext';
import { GameContextProvider } from './contexts/GameContext';
import { ModalProvider } from './contexts/ModalContext';

function App() {
  const { theme } = useContext(ThemeContext);
  const mode = theme.toLowerCase() === 'light' ? lightTheme : darkTheme;

  return (
    <ThemeProvider theme={mode}>
      <GlobalStyles />
      <ModalProvider>
        <GameContextProvider>
          <Router />
        </GameContextProvider>
      </ModalProvider>
    </ThemeProvider>
  );
}

export default App;

import React, { useContext } from 'react';
import Router from './Router';
import { GlobalStyles } from './styles/Global.styled';
import { ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme } from './styles/theme'; // ✅ corrected casing
import { ThemeContext } from './contexts/ThemeContext';
import  ModalContextProvider  from './contexts/ModalContext'; // ✅ added missing import

function App() {
  const { theme } = useContext(ThemeContext);
  const mode = theme === 'Light' ? lightTheme : darkTheme; // ✅ use correct theme

  return (
    <ThemeProvider theme={mode}>
      <ModalContextProvider>
        <GlobalStyles />
        <Router />
      </ModalContextProvider>
    </ThemeProvider>
  );
}

export default App;

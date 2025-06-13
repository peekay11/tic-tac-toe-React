import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Game from "./pages/Game/Game";
import Details from "./pages/Details/Details";
import Header from "./components/Header/Header";
import ModalContextProvider from './contexts/ModalContext';
import { GameContextProvider } from './contexts/GameContext';

function AppRouter() {
  return (
    <Router>
      <ModalContextProvider>
        <GameContextProvider>
          <Header />
          <Routes>
            <Route index element={<Home />} />
            <Route path="details" element={<Details />} />
            <Route path="game-on" element={<Game />} />
          </Routes>
        </GameContextProvider>
      </ModalContextProvider>
    </Router>
  );
}

export default AppRouter;

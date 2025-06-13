import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Game from "./pages/Game/Game";
import Details from "./pages/Details/Details";
import Header from "./components/Header/Header";
import ModalTemplate from "./Modal/ModalTemplate";

function Router() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route index element={<Home />} />
        <Route path="details" element={<Details />} />
        <Route path="game-on" element={<Game />} />
      </Routes>
      <ModalTemplate />
    </BrowserRouter>
  );
}

export default Router;

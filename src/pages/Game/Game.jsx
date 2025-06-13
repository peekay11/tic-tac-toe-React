// src/pages/Game/Game.jsx
import React, { useContext } from "react";
import { createContext, useState } from "react";

// Context setup
export const GameContext = createContext({});

export const GameContextProvider = (props) => {
  const [game, setGame] = useState({
    board: [1, 2, 3, 4, 5, 6, 7, 8, 9],
  });

  const updateBoard = (index) => {
    if (game.board[index] === "x" || game.board[index] === "o") return;
    const updatedBoard = [...game.board];
    updatedBoard[index] = "x";
    setGame({ ...game, board: updatedBoard });
  };

  return (
    <GameContext.Provider value={{ game, updateBoard }}>
      {props.children}
    </GameContext.Provider>
  );
};

// Page component for routing
function Game() {
  const { game, updateBoard } = useContext(GameContext);

  return (
    <div>
      <h1>Tic Tac Toe</h1>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 100px)", gap: "10px" }}>
        {game.board.map((cell, index) => (
          <button
            key={index}
            style={{ height: "100px", fontSize: "2rem" }}
            onClick={() => updateBoard(index)}
          >
            {cell}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Game; // ✅ This satisfies the default import in Router.jsx

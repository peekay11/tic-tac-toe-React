const checkForSequence = (a, b, c) => {
  return a === b && b === c;
};

export const checkForWinner = (board) => {
  // Check rows
  for (let i = 0; i < 9; i += 3) {
    if (checkForSequence(board[i], board[i + 1], board[i + 2])) {
      console.log("ROW winner");
      return true;
    }
  }

  // Check columns
  for (let i = 0; i < 3; i++) {
    if (checkForSequence(board[i], board[i + 3], board[i + 6])) {
      console.log("COLUMN winner");
      return true;
    }
  }

  // Check diagonals
  if (checkForSequence(board[0], board[4], board[8])) {
    console.log("DIAGONAL winner");
    return true;
  } else if (checkForSequence(board[2], board[4], board[6])) {
    console.log("DIAGONAL winner");
    return true;
  }

  return false;
};

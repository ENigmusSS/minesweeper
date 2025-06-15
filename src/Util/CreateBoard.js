export default function createBoard(rows, cols, mines) {
  let board = [];
  for (let y = 0; y < rows; y++) {
    let row = [];
    for (let x = 0; x < cols; x++) {
      row.push({
        x: x,
        y: y,
        isMined: false,
        isOpen: false,
        isFlagged: false,
        minesAround: 0
      });
    }
    board.push(row);
  }
  for (let i = 0; i < mines;) {
    const rndX = Math.floor(Math.random() * cols);
    const rndY = Math.floor(Math.random() * rows);
    if (board[rndY][rndX].isMined) continue;
    board[rndY][rndX].isMined = true;
    i++;
  }
  for (const row of board) {
    for (const cell of row) {
      if (cell.isMined) continue;
      if (cell.x > 0 && cell.y > 0) {
        if (board[cell.y - 1][cell.x - 1].isMined) cell.minesAround++;
      }
      if (cell.y > 0) {
        if (board[cell.y - 1][cell.x].isMined) cell.minesAround++;
      }
      if (cell.y > 0 && cell.x < cols -1) {
        if (board[cell.y - 1][cell.x + 1].isMined) cell.minesAround++;
      }
      if (cell.x > 0) {
        if (board[cell.y][cell.x - 1].isMined) cell.minesAround++;
      }
      if (cell.x < cols - 1) {
        if (board[cell.y][cell.x + 1].isMined) cell.minesAround++;
      }
      if (cell.x > 0 && cell.y < rows -1) {
        if (board[cell.y + 1][cell.x -1].isMined) cell.minesAround++;
      }
      if (cell.y < rows -1) {
        if (board[cell.y + 1][cell.x].isMined) cell.minesAround++;
      }
      if (cell.y < rows -1 && cell.x < cols -1) {
        if (board[cell.y + 1][cell.x + 1].isMined) cell.minesAround++;
      }
    }
  }
  return board;
}

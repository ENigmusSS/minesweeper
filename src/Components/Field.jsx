import { Row } from "./Row";
import { useEffect, useState } from "react";
import createBoard from "../Util/CreateBoard";

export const Field = ({
  setFlags,
  setGameStatus,
  gameStatus,
  rows,
  cols,
  mines,
}) => {
  const [board, setBoard] = useState([]);

  useEffect(() => {
    if (gameStatus === "beforeStart") setBoard(createBoard(rows, cols, mines));
  }, [gameStatus]);

  return (
    <div className={"Field"}>
      {board.map(value => (
        <Row
          key={value[0].y}
          row={value}
          flagCell={flagCell}
          openCell={openCell}
        />
      ))}
    </div>
  );

  function flagCell(x, y) {
    if (gameStatus === "beforeStart") setGameStatus("running");
    let newBoard = JSON.parse(JSON.stringify(board));
    newBoard[y][x].isFlagged = !newBoard[y][x].isFlagged;
    if (newBoard[y][x].isFlagged) setFlags(prevState => prevState - 1);
    else setFlags(prevState => prevState + 1);
    setBoard(newBoard);
    if (board.every(cell => cell.isFlagged && cell.isMined))
      setGameStatus("victory");
  }

  function openCell(x, y) {
    if (gameStatus === "beforeStart") setGameStatus("running");
    let newBoard = JSON.parse(JSON.stringify(board));
    setBoard(openCellRecursive(newBoard, x, y));
    if (board.every(cell => cell.isFlagged && cell.isMined))
      setGameStatus("victory");
  }

  function openCellRecursive(newBoard, x, y) {
    const cell = newBoard[y][x];
    cell.isOpen = true;
    if (cell.isMined) {
      setGameStatus("loss");
      newBoard.forEach(row => row.forEach(cll => (cll.isOpen = true)));
    }
    if (!cell.isMined && cell.minesAround === 0) {
      const directions = [
        [-1, -1],
        [-1, 0],
        [-1, 1],
        [0, -1],
        [0, 1],
        [1, -1],
        [1, 0],
        [1, 1],
      ];

      for (const [dx, dy] of directions) {
        const nx = x + dx;
        const ny = y + dy;
        if (nx >= 0 && ny >= 0 && nx < cols && ny < rows) {
          const neighbor = newBoard[ny][nx];
          if (!neighbor.isOpen) {
            openCellRecursive(newBoard, nx, ny);
          }
        }
      }
    }

    return newBoard;
  }
};

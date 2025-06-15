import { useEffect, useState } from "react";

export const Cell = ({ cellData, openCell, flagCell }) => {
  let className = "cell";
  if (cellData.isFlagged) className += " flagged";
  if (cellData.isOpen && cellData.isMined) className += " fired";
  if (cellData.isOpen && !cellData.isMined) className += " open";

  return (
    <div
      className={className}
      onClick={() => openCell(cellData.x, cellData.y)}
      onContextMenu={event => {
        event.preventDefault();
        flagCell(cellData.x, cellData.y);
      }}
    >
      {cellData.isOpen && cellData.minesAround > 0 && (
        <p>{cellData.minesAround}</p>
      )}
    </div>
  );
};

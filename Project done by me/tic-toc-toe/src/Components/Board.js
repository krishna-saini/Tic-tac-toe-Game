import Square from "./Square";

import "../index.css";
import { useState } from "react";

const Board = (props) => {
  function renderSquare(i) {
    return (
      <Square
        className="square"
        value={props.array[i]}
        key={i}
        onClick={() => props.onClick(i)}
      />
    );
  }
  let rows = [1, 2, 3];
  let cols = [4, 5, 6];
  let i = 0;
  return (
    <div>
      {rows.map((row) => (
        <div className="board-row" key={row}>
          {cols.map((col) => renderSquare(`${i++}`))}
        </div>
      ))}
      {/* Hardcoded below */}
      {/* <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div> */}
    </div>
  );
};

export default Board;

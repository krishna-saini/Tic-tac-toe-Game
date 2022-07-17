import logo from "./logo.svg";
import "./App.css";
import Board from "./Components/Board";
import { useState } from "react";

function App() {
  let row, col;
  const [state, setState] = useState({
    // squares: Array(9).fill(null), use it if history not required
    history: [{ squares: Array(9).fill(null) }],
    stepNumber: 0,
    xIsNext: true,
  });

  function calculateWinner(square) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let k = 0; k < lines.length; k++) {
      const [a, b, c] = lines[k];
      if (square[a] === square[b] && square[a] === square[c]) {
        return square[a];
      }
    }
    return null;
  }

  const clickHandler = (i) => {
    i = Number(i);
    const history = state.history.slice(0, state.stepNumber + 1); //This ensures that if we “go back in time” and then make a new move from that point, we throw away all the “future” history that would now be incorrect.

    const currentArray = history[history.length - 1];
    const currentArrCopy = currentArray.squares.slice(); //crearting copy
    //check if current configuration is winning | current square should not be modified
    if (calculateWinner(currentArrCopy) || currentArrCopy[i]) {
      return;
    }
    //updating current array
    currentArrCopy[i] = state.xIsNext ? "X" : "O";
    //updating state
    setState((prev) => {
      const newState = { ...prev };
      newState.history = history.concat({ squares: currentArrCopy });
      // updatedState.history.push({ squares: copySquare });  mutate original array hence used concat
      newState.stepNumber = newState.history.length - 1;
      newState.xIsNext = !newState.xIsNext;
      return newState;
    });
  };
  console.log();
  function jumpTo(step) {
    document.querySelector(".status").style.color = "black";
    setState((prev) => {
      const newState = { ...prev };
      newState.stepNumber = step;
      newState.xIsNext = step % 2 === 0; //bcz at even step, X is playing
      return newState;
    });
  }

  //check winner array
  let status;

  const current = state.history[state.stepNumber]; //to rendering the currently selected move according to stepNumber:

  const winnerArray = calculateWinner(current.squares);
  if (winnerArray) {
    status = "Winner is " + winnerArray;
    document.querySelector(".status").style.color = "green";
  } else {
    status = "Next player: " + (state.xIsNext ? "X" : "O");
  }

  // handling moves
  const moves = state.history.map((_, index) => {
    const content = index ? `go to move #${index}` : "go to game start";
    return (
      <li key={index}>
        <button onClick={() => jumpTo(index)}>{content}</button>
      </li>
    );
  });

  return (
    <div className="game">
      <div className="game-board">
        <Board array={current.squares} onClick={(i) => clickHandler(i)}></Board>
      </div>
      <div className="game-info">
        <div className="status">{status}</div>
        <ol>{moves}</ol>
      </div>
    </div>
  );
}

export default App;

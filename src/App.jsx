import React, { useEffect, useRef, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { Panel } from "./Components/Panel";
import { Field } from "./Components/Field";

function App() {
  const rows = 10;
  const cols = 10;
  const mines = 10;
  const [time, setTime] = useState(0);
  const [flags, setFlags] = useState(mines);
  const [gameStatus, setGameStatus] = useState("beforeStart");
  let timer = useRef(null);
  useEffect(() => {
    switch (gameStatus) {
      case "beforeStart":
        {
          setTime(0);
          setFlags(mines);
          clearInterval(timer.current);
          timer.current = null;
        }
        break;
      case "running":
        {
          timer.current = setInterval(() => {
            setTime(prevState => prevState + 1);
          }, 1000);
        }
        break;
      case "victory":
        {
          clearInterval(timer.current);
          timer.current = null;
          alert("Congratulations!!!");
        }
        break;
      case "loss": {
        clearInterval(timer.current);
        timer.current = null;
        alert("BOOM!");
      }
    }
  }, [gameStatus]);
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Minesweeper
          <img src={logo} className="App-logo" alt="logo" />
        </p>
      </header>
      <Panel time={time} flags={flags} setGameStatus={setGameStatus} />
      <Field
        setGameStatus={setGameStatus}
        setFlags={setFlags}
        gameStatus={gameStatus}
        rows={rows}
        cols={cols}
        mines={mines}
      />
    </div>
  );
}

export default App;

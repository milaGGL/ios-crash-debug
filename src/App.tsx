import React from "react";
import logo from "./logo.svg";
import "./App.css";

import { DocumentData, FirestoreError } from "firebase/firestore";
import { DebugComponent } from "./DebugComponent";

function App() {
  const [started, setStarted] = React.useState(false);
  const [done, setDone] = React.useState(false);
  const [count, setCount] = React.useState<string | number>(0);
  const [error, setError] = React.useState<FirestoreError | undefined>();

  const handleClick = () => {
    setStarted(true);
  };
  const reset = () => {
    setStarted(false);
    setDone(false);
  };

  return (
    <div className="App">
      <header className="App-header">
        <p>Testing iOS safari crash</p>
      </header>
      <div>
        <p>Firestore: {error ? "Failed" : "Connected"}</p>
        {error && <p> Error: {error?.message} </p>}
        <div>Note: 50 documents ≈ 2MB</div>
      </div>
      <div>
        <DebugComponent />
      </div>
    </div>
  );
}

export default App;

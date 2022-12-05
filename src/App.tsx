import { useState } from "react";
import "./App.css";
import { Box } from "./Components/Box";
import { randomField } from "./utils";
// let wounded = 0;
const playerField = randomField();
const pcField = randomField();
const movePc = Array(100).fill(false);
const movePlayer = Array(100).fill(false);
const openPlayer = Array(100).fill(false);

function App() {
  const [openPc, setOpenPc] = useState(Array(100).fill(false));

  return (
    <div className="App">
      <div className="boxes playerField">
        {playerField.map((value, i) => (
          <Box
            key={i}
            player={true}
            value={value}
            index={i}
            movePc={movePc}
            movePlayer={movePlayer}
            openPc={openPc}
            setOpenPc={setOpenPc}
            playerField={playerField}
            openPlayer={openPlayer}
          />
        ))}
      </div>
      <div className="boxes pcField">
        {pcField.map((value, i) => (
          <Box
            key={i}
            player={false}
            value={value}
            index={i}
            movePc={movePc}
            movePlayer={movePlayer}
            openPc={openPc}
            setOpenPc={setOpenPc}
            playerField={playerField}
            openPlayer={openPlayer}
          />
        ))}
      </div>
    </div>
  );
}

export default App;

import { nanoid } from 'nanoid';
import { useState } from "react";
import Dice from "./components/Dice";

export default function App() {

  const [dices, setDices] = useState(allRandomDices());

  function allRandomDices() {
    const dices = [];
    for (let i = 0; i < 10; i++) {
      dices.push(createNewDice());
    }

    const diceElements = dices.map(dice => <Dice key={dice.id} value={dice.value} isHeld={dice.isHeld} />);

    return diceElements;
  }

  function rool() {
    setDices(allRandomDices());
  }

  function createNewDice() {
    return {
      id: nanoid(),
      value: Math.ceil(Math.random() * 6),
      isHeld: false
    }
  }

  return (
    <div className="Game">
      <div className="game-box">
        <div className="top-texts">
          <h1>Tenzies</h1>
          <p>Role até que todos os dados sejam iguais. Clique em cada dado para congelá-lo em seu valor atual entre os lançamentos.</p>
        </div>
        <div className="dices">
          {dices}
        </div>
        <button onClick={rool} className="roll-button">Rolar</button>
      </div>
    </div>
  );
}
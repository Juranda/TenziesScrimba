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
    return dices;
  }

  function toggleDice(id) {

    setDices(prevDices => {
      const diceToToggle = dices.find(dice => dice.id === id);

      return prevDices.map(dice => {
        return dice.id === diceToToggle.id ?
          {
            ...dice,
            isHeld: !dice.isHeld
          } : dice
      })
    });
  }

  function rool() {
    setDices(prevDices => {
      return prevDices.map(dice => dice.isHeld ? dice : createNewDice());
    });
  }

  function createNewDice() {
    return {
      id: nanoid(),
      value: Math.ceil(Math.random() * 6),
      isHeld: false
    }
  }

  const diceElements = dices.map(dice => {
    return <Dice key={dice.id} onClick={() => toggleDice(dice.id)} value={dice.value} isHeld={dice.isHeld} />
  });


  return (
    <div className="Game">
      <div className="game-box">
        <div className="top-texts">
          <h1>Tenzies</h1>
          <p>Role até que todos os dados sejam iguais. Clique em cada dado para congelá-lo em seu valor atual entre os lançamentos.</p>
        </div>
        <div className="dices">
          {diceElements}
        </div>
        <button onClick={rool} className="roll-button">Rolar</button>
      </div>
    </div>
  );
}
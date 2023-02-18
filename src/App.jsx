import { nanoid } from 'nanoid';
import { useEffect, useState } from "react";
import Dice from "./components/Dice";
import Confetti from 'react-confetti';
import Modal from './components/Modal';

export default function App() {

  const [dices, setDices] = useState(allRandomDices());
  const [tenzies, setTenzies] = useState(false);
  const [modalOpen, setModalState] = useState(false);

  useEffect(() => {
    const firstNum = dices[0].value;

    const allHeld = dices.every(dice => dice.isHeld);
    const allSameNumber = dices.every(dice => dice.value === firstNum);

    if (allHeld && allSameNumber) {
      console.log("Game won!");
      gameWon();
    } else {
      console.log("Dices changed!")
    }

  }, [dices]);


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
    setDices(prevDices =>
      prevDices.map(
        dice => dice.isHeld ?
          dice :
          createNewDice()
      )
    );
  }

  function createNewDice() {
    return {
      id: nanoid(),
      value: Math.ceil(Math.random() * 6),
      isHeld: false
    }
  }

  function gameWon() {
    setTenzies(true);
  }

  function newGame() {
    setTenzies(false);
    setDices(allRandomDices());
  }

  function toggleModal() {
    setModalState(prev => !prev);
  }

  const diceElements = dices.map(dice => {
    return <Dice key={dice.id} onClick={() => toggleDice(dice.id)} value={dice.value} isHeld={dice.isHeld} />
  });


  return (
    <div className="Game">
      {tenzies && <Confetti />}
      <div className="game-box">
        <div className="top-texts">
          <h1>Tenzies</h1>
          <p>Role até que todos os dados sejam iguais. Clique em cada dado para congelá-lo em seu valor atual entre os lançamentos.</p>
        </div>
        <div className="dices">
          {diceElements}
        </div>
        <div className="buttons"> 
          <button onClick={tenzies ? newGame : rool} className="roll-button">{tenzies ? "De novo" : "Rolar"}</button>
          {tenzies &&
            <button className="roll-button">Status</button>
          }
        </div>
      </div>
      <Modal isActive={modalOpen} />

      <button onClick={toggleModal} className="roll-button status-button">
          { modalOpen ? "Fechar status" : "Abrir Status" }
      </button>
    </div>
  );
}
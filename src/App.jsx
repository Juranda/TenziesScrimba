import { nanoid } from 'nanoid';
import { useEffect, useState } from "react";
import Dice from "./components/Dice";
import Confetti from 'react-confetti';
import Modal from './components/Modal';

export default function App() {

  const status = {
    roolClicked: {
      text: "Rolar clicados",
      value: 0
    },
    dicesGenerated: {
      text: "Dados gerados",
      value: 0
    },
    dicesHeld: {
      text: "Dados congelados",
      value: 0
    }
  }

  const [dices, setDices] = useState(allRandomDices());
  const [tenzies, setTenzies] = useState(false);
  const [modalOpen, setModalState] = useState(false);
  const [stats, setStatus] = useState(status);

  useEffect(() => {
    const firstNum = dices[0].value;

    const allHeld = dices.every(dice => dice.isHeld);
    const allSameNumber = dices.every(dice => dice.value === firstNum);

    if (allHeld && allSameNumber) gameWon();

  }, [dices]);

  function allRandomDices() {
    const dices = [];
    for (let i = 0; i < 10; i++) {
      dices.push(createNewDice());
    }
    return dices;
  }

  function toggleDice(id) {
    const diceToToggle = dices.find(dice => dice.id === id);

    if (!diceToToggle.isHeld) {
      setStatus(prevDices => {
        return {
          ...prevDices,
          dicesHeld: {
            ...prevDices.dicesHeld,
            value: prevDices.dicesHeld.value + 1
          }
        }
      });     
    }

    setDices(prevDices => {
      return prevDices.map(dice => {
        if (dice.id === diceToToggle.id) {
          return {
            ...dice,
            isHeld: !dice.isHeld
          }
        }
        return dice
      });
    });
  }

  function rool() {

    const newDices = dices.map(dice => {
      if (dice.isHeld) return dice;
      return createNewDice();
    });
    
    const dicesGenerated = newDices.filter(dice => !dice.isHeld).length;

    setDices(newDices);

    setStatus(prevStats => ({
      ...prevStats,
      roolClicked: {
        ...prevStats.roolClicked,
        value: prevStats.roolClicked.value + 1
      },
      dicesGenerated: {
        ...prevStats.dicesGenerated,
        value: prevStats.dicesGenerated.value + dicesGenerated
      }
    }));
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
    resetStatus();
    setTenzies(false);
    setDices(allRandomDices());
  }

  function toggleModal() {
    setModalState(prev => !prev);
  }

  function resetStatus() {
    setStatus(status);
  }

  const diceElements = dices.map(dice => {
    return <Dice key={dice.id} onClick={() => toggleDice(dice.id)} value={dice.value} isHeld={dice.isHeld} />
  });

  return (
    <div className="Game">
      <div className="game-box">
        {tenzies && <Confetti width={388} height={388}/>}
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
            <button onClick={toggleModal} className="roll-button">Status</button>
          }
        </div>
      </div>
      <Modal isActive={modalOpen}  stats={stats} closeModal={toggleModal} />
    </div>
  );
}
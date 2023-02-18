import Dice from "./components/Dice";

export default function App() {
  return (
    <div className="Game">
      <div className="game-box">
        <div className="top-texts">
          <h1>Tenzies</h1>
          <p>Role até que todos os dados sejam iguais. Clique em cada dado para congelá-lo em seu valor atual entre os lançamentos.</p>
        </div>
        <div className="dices">
          <Dice value="1" />
          <Dice value="1" />
          <Dice value="1" />
          <Dice value="1" />
          <Dice value="1" />
          <Dice value="1" />
          <Dice value="1" />
          <Dice value="1" />
          <Dice value="1" />
          <Dice value="1" />
        </div>
        <button className="roll-button">Rolar</button>
      </div>
    </div>
  );
}
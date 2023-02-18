import Dice from "./components/Dice";

export default function App() {
  return (
    <div className="Game">
      <div className="game-box">
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
      </div>
    </div>
  );
}
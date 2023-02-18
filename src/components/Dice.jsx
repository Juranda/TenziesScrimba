export default function Dice({ onClick, value, isHeld }) {
    return (
        <div onClick={onClick} className={isHeld ? "dice dice-held" : "dice"}>
            <h2>{value}</h2>
        </div>
    );
}
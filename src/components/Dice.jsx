export default function Dice({ onClick, value, isHeld }) {

    
    return (
        <div onClick={onClick} className={isHeld ? `dice dice-${value} dice-held` : `dice dice-${value}`}>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
        </div>
    );
}
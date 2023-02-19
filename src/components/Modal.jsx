import StatAttribute from "./StatAttribute";

export default function Modal({ isActive, stats, closeModal }) {

    const statsElements = Object.values(stats).map((entrie, index) => {
        return <StatAttribute key={index} name={entrie.text} value={entrie.value} /> 
    })

    return isActive &&
        <div className="game-stats-modal">
            <div className="game-stats">
                <h1 className="game-stats-title">Status</h1>
                <div className="stats">
                    {statsElements}
                </div>
                <button className="roll-button" onClick={closeModal}>Fechar</button>
            </div>
        </div>
}
import StatAttribute from "./StatAttribute";

export default function Modal({ isActive, children, closeModal }) {


    return isActive &&
        <div className="game-stats-modal">
            <div className="game-stats">
                <h1 className="game-stats-title">Status</h1>
                <div className="stats">
                    <StatAttribute name="Tempo de jogo" value="00:00" />
                    <StatAttribute name="Dados gerados" value="73" />
                    <StatAttribute name="Dados marcados" value="14" />
                </div>
            </div>
        </div>
}
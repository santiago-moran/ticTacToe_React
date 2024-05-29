import { Square } from "./Square"
import "../styles/Modal.css"

export function EndGameModal ({winner, turn, changeTurn}) {
    return (
        <div className= {winner !== undefined ? "modal show" : "modal hide"}>
            <h2>{!winner ? 'Empate' : 'Ganador'}</h2>
            <div>
                <Square 
                        content={turn} 
                        changeTurn={changeTurn} 
                        index={null} 
                        className="square active"
                />
            </div>
            <button className="playAgain">Jugar de nuevo</button>
        </div>
    )
}
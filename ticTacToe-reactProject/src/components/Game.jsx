import "../styles/Game.css"
import { Square } from "./Square";

const squares = Array(9).fill(null);
const turns = {
    X : 'X',
    O : 'O'
};

export function Game () {

    return (
        <>
        <section className="board">
            {
                squares.map((_, index)=> {
                    return (
                        <Square symbol= {null} key= {index}/>
                    )
                })
            }
        </section>
        <section className="showTurn">
            <div className="xTurn">{turns.X}</div>
            <div className="oTurn">{turns.O}</div>
        </section>
        </>
    )
}
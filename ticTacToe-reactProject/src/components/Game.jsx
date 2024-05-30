import "../styles/Game.css";
import { Square } from "./Square";
import { EndGameModal } from "./EndGameModal";
import { PendingGame } from "./PendingGame";
import { useState } from "react";

const squares = Array(9).fill(null)
const turns = {
    X : 'X',
    O : 'O'
}
const winnerCombos = [
    [0, 1, 2], 
    [3, 4, 5], 
    [6, 7, 8], 
    [0, 3, 6], 
    [1, 4, 7], 
    [2, 5, 8], 
    [0, 4, 8], 
    [2, 4, 6]
]

export function Game () {
    const [turn, setTurn] = useState(() => {
        return localStorage.getItem('turn') ?? turns.X
    })
    const [content, setContent] = useState(() => {
        return JSON.parse(localStorage.getItem('content')) ?? squares
    })
    const [winner, setWinner] = useState(() => {
        return localStorage.getItem('winner') ?? undefined
    })
    const [className, setClassName] = useState(() => {
        return localStorage.length != 0 ? 'endGame show' : 'endGame hide'
    })

    const changeTurn = (index) => {
        if (content[index] !== null || winner !== undefined) {
            return
        }

        const newContent = [...content]
        newContent[index] = turn
        setContent(newContent)
        localStorage.setItem('content', JSON.stringify(newContent))
        const checkBoardComplete = newContent.every(value => value !== null)
        
        if (verifyWinner(newContent)) {
            setTimeout(() => {
                setWinner(turn)
                localStorage.setItem('winner', turn)
            }, 100);
        }
        else if (!verifyWinner(newContent) && checkBoardComplete) {
            setTimeout(() => {
                setWinner(false)
                localStorage.setItem('winner', 'false')
            }, 100);
        }
        else {
            const newTurn = turn == turns.X ? turns.O : turns.X
            setTurn(newTurn);
            localStorage.setItem('turn', newTurn)
        }
    }
    const verifyWinner = (newContent) => {
        for (const combo of winnerCombos) {
            if (newContent[combo[0]] !== null && newContent[combo[0]] == newContent[combo[1]] && newContent[combo[0]] == newContent[combo[2]]) {
                return true
            }
        }
        return false
    }
    const restartGame = () => {
        setTurn(turns.X)
        setContent(squares)
        setWinner(undefined)
        hideModal()
        localStorage.clear()
    }
    const hideModal = () => {
        setClassName('endGame hide')
    }

    return (
        <>
        <h1>TIC TAC TOE</h1>
        <section className="board">
            {
                squares.map((_, index)=> {
                    return (
                        <Square 
                            content= {content[index]} 
                            changeTurn= {changeTurn} 
                            index= {index} 
                            className= "square" 
                            key= {index}
                        />
                    )
                })
            }
        </section>
        <section className="showTurn">
            <Square 
                content={turns.X} 
                changeTurn={changeTurn} 
                index= {null} 
                className={turn == turns.X ? "square active" : "square"}
            />
            <Square 
                content={turns.O} 
                changeTurn={changeTurn} 
                index= {null} 
                className={turn == turns.X ? "square" : "square active"}
            />
        </section>
        <div>
            <button className="playAgain restart" onClick={restartGame}>Restart Game</button>
        </div>
        <section className={winner !== undefined ? "endGame show" : "endGame hide"}>
            <EndGameModal 
                winner={winner} 
                turn={winner == 'false' ? '-' : turn} 
                changeTurn={changeTurn}
                restartGame={restartGame}
            />
        </section>
        <section className={className}>
            <PendingGame 
            restartGame={restartGame}
            hideModal= {hideModal}
            />
        </section>
        </>
    )
}
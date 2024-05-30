export function PendingGame ({restartGame, hideModal}) {
    return (
        <div className="modal">
            <h2>Tienes una partida en curso...</h2>
            <div>
                <button className="playAgain" onClick={hideModal}>Continuar partida</button>
                <button className="playAgain restartGame" onClick={restartGame}>Reiniciar partida</button>
            </div>
        </div>
    )
}
import '../styles/Square.css'

export function Square ({content, changeTurn, index, className}) {

    const handeClick = () => {
        changeTurn(index)
    }

    return (
    <div className={className} onClick={handeClick}>
        {content}
    </div>
    )
}
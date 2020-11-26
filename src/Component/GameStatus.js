import React from 'react'
function GameStatus(props) {
  return (
    <React.Fragment>
    {
      props.gameOver ?
        <h1>Game Over 😫</h1> :
      (
        props.playerWon ?
          <h1>You won 😬!</h1> :
          <h1>{(props.boardSize * (props.boardSize - 1)) - props.revealedCount} to winning</h1>
      )
    }
    </React.Fragment>
  )
}
export default GameStatus
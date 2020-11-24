import React, {Component} from 'react'
import './App.css';
import Game, {createBoard, writeBoard} from './Component'

class App extends Component {
  constructor() {
    super()
    this.boards = createBoard(10)
    this.openedBoard = this.boards.openedBoard
    this.state = {
      gameBoard: this.boards.closedBoard,
      cellPicked: null,
      revealedCount: 0,
      playerWon: false,
      gameOver: false,
    }
  }
  handleClick(cell) {
    const gameBoard = this.state.gameBoard.slice()
    const size = gameBoard.length

    if (cell.reveal) return

    const newBoard = writeBoard(gameBoard, cell, this.state.revealedCount, this.openedBoard)

    //if player opens all valid cells >> declare winning
    if(newBoard.revealedCount === (size * size) - size) {
      this.setState({
        gameBoard: newBoard.board,
        revealedCount: newBoard.revealedCount,
        playerWon: true
      })
    } else if (newBoard.gameOver) {
      this.setState({
        gameBoard: newBoard.board,
        revealedCount: newBoard.revealedCount,
        gameOver: newBoard.gameOver
      })
    } else {
      this.setState({
        gameBoard: newBoard.board,
        revealedCount: newBoard.revealedCount
      })
    }

  }
  render() {
    return (
      <div className="App">
        <Game 
          playerWon={this.state.playerWon}
          gameOver={this.state.gameOver}
          board={this.state.gameBoard}
          onClick={(e) => this.handleClick(e)}
        />
      </div>
    )
  }
}

export default App;

import React, { Component } from 'react'
import './App.css';
import Game, { createBoard, writeBoard } from './Component'

class App extends Component {
  constructor() {
    super()
    this.boards = createBoard(10)
    this.openedBoard = this.boards.openedBoard
    this.state = {
      gameBoard: this.boards.closedBoard,
      revealedCount: 0,
      playerWon: false,
      gameOver: false,
      ctrKeyPressed: false
    }
    this.handleRightClick = this.handleRightClick.bind(this)
    this.disableContextMenu = this.disableContextMenu.bind(this)
  }

  componentDidMount() {
    document.addEventListener('contextmenu', this.disableContextMenu)
  }

  disableContextMenu(e) {
    e.preventDefault()
  }

  handleRightClick(cell, e) {
    if (!this.isRightClick(e)) {
      return
    }
    if (cell.reveal) return
    const board = this.state.gameBoard.slice()
    board[cell.id[0]][cell.id[1]].flag = !board[cell.id[0]][cell.id[1]].flag
    this.setState({
      gameBoard: board
    })
  }

  isRightClick(e) {
    return e.button === 2 || (e.button === 0 && e.ctrlKey)
  }

  handleClick(cell, e) {
    const gameBoard = this.state.gameBoard.slice()
    const size = gameBoard.length

    if (cell.reveal) return

    const newBoard = writeBoard(gameBoard, cell, this.state.revealedCount, this.openedBoard)

    //if player opens all valid cells >> declare winning
    if (newBoard.revealedCount === (size * size) - size) {
      this.setState({
        gameBoard: this.openedBoard,
        revealedCount: newBoard.revealedCount,
        playerWon: true
      })
    } else if (newBoard.gameOver) {
      this.setState({
        gameBoard: this.openedBoard,
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
      <div className='App'>
        <div className='status'>
          {
            this.state.gameOver ?
              <h1>'Game Over 😫'</h1> :
              (
                this.state.playerWon ?
                  <h1>You won!</h1> :
                  <h1>{(this.state.gameBoard.length * this.state.gameBoard.length) - this.state.revealedCount} to winning</h1>
              )
          }
          <button></button>
        </div>
        <Game
          playerWon={this.state.playerWon}
          gameOver={this.state.gameOver}
          board={this.state.gameBoard}
          onClick={(cell, e) => this.handleClick(cell, e)}
          handleRightClick={(cell, e) => this.handleRightClick(cell, e)}
        />
      </div>
    )
  }
}

export default App;

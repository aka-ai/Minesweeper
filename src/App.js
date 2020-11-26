import React, { Component } from 'react'
import './App.css';
import Game, { createBoard, writeBoard } from './Component'

class App extends Component {
  constructor() {
    super()
    this.state = {
      gameBoard: createBoard(10),
      revealedCount: 0,
      playerWon: false,
      gameOver: false
    }
    this.handleRightClick = this.handleRightClick.bind(this)
    this.disableContextMenu = this.disableContextMenu.bind(this)
  }

  componentDidMount() {
    // disable default right click behavior so we can add flags
    document.addEventListener('contextmenu', (this.disableContextMenu))
  }
  //todod refactor if possible
  disableContextMenu(e) {
    e.preventDefault()
  }

  handleRightClick(cell, e) {
    if (!this.isRightClick(e) || this.isCellClickable(cell)) return
    const gameBoard = this.state.gameBoard.slice()
    const updatedCell = gameBoard[cell.id[0]][cell.id[1]]
    updatedCell.flag = !updatedCell.flag
    this.setState({ gameBoard })
  }

  isCellClickable(cell) {
    return (cell.reveal && !this.state.gameOver && !this.state.playerWon)
  }

  isRightClick(e) {
    // todo: check if this captures all right clicks (two finger tap, right clicks in windows, on mobile)
    return e.button === 2 || (e.button === 0 && e.ctrlKey)
  }

  handleClick(cell) {
    if (this.isCellClickable(cell)) return
    const gameBoard = this.state.gameBoard.slice()
    const size = gameBoard.length
    const newBoard = writeBoard(gameBoard, cell, this.state.revealedCount)

    //if player opens all valid cells >> declare winning
    if (newBoard.revealedCount === (size * size) - size) {
      this.setState({
        playerWon: true
      })
    } else if (newBoard.gameOver) {
      this.setState({
        gameOver: true
      })
    } else {
      this.setState({
        gameBoard: newBoard.board,
        revealedCount: newBoard.revealedCount
      })
    }
  }
  newGame() {
    this.setState({
      gameBoard: createBoard(10),
      revealedCount: 0,
      playerWon: false,
      gameOver: false,
    })
  }

  render() {
    return (
      <div className='App'>
        <div className='status'>
          {
            this.state.gameOver ?
              <h1>Game Over 😫</h1> :
              (
                this.state.playerWon ?
                  <h1>You won 😬!</h1> :
                  <h1>{(this.state.gameBoard.length * this.state.gameBoard.length) - this.state.revealedCount} to winning</h1>
              )
          }
          <button
            className='new-game'
            onClick={() => this.newGame()}
          >
            new game
          </button>
        </div>
        <Game
          playerWon={this.state.playerWon}
          gameOver={this.state.gameOver}
          board={this.state.gameBoard}
          onClick={(cell) => this.handleClick(cell)}
          handleRightClick={(cell, e) => this.handleRightClick(cell, e)}
        />
      </div>
    )
  }
}

export default App;

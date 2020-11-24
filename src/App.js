import React, {Component} from 'react'
import './App.css';
import Game, {createBoard} from './Component'

class App extends Component {
  constructor() {
    super()
    this.state = {
      gameBoard: createBoard(10)
    }
  }
  render() {
    console.log(this.state.gameBoard)
    return (
      <div className="App">
        <Game 
          board={this.state.gameBoard}
        />
      </div>
    )
  }
}

export default App;

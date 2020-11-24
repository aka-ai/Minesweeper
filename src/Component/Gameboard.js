import React, {Component} from 'react'
import Square from './Square'
class Gameboard extends Component {
  constructor(props) {
    super(props)

  }
  render() {
    return (
      <div className="game-board">
        <h1>{this.props.playerWon ? 'You Won!' : ''}</h1>
        <h1>{this.props.gameOver ? 'Game Over' : ''}</h1>
        {this.props.board.map((row, idx) => {
          return (
            <div key={idx} className='board-row'>
              {row.map((cell, idx) => {
                return (
                  <Square
                    key={idx}
                    id={cell.id}
                    element={cell.element}
                    reveal={cell.reveal}
                    onClick={() => this.props.onClick(cell)}
                  />
                )
              })}
            </div>
          )
        })}
      </div>
    )
  }
}
export default Gameboard
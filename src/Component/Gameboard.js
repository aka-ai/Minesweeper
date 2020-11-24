import React, {Component} from 'react'
import Square from './Square'
class Gameboard extends Component {
  constructor(props) {
    super(props)

  }
  render() {
    return (
      <div className="game-board">
        <h1>playerName</h1>
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
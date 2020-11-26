import React, { Component } from 'react'
import Square from './Square'
class Gameboard extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className='game-board'>
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
                    flag={cell.flag}
                    gameOver={this.props.gameOver}
                    playerWon={this.props.playerWon}
                    onClick={() => this.props.onClick(cell)}
                    handleRightClick={(e) => {
                      this.props.handleRightClick(cell, e)
                    }}
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
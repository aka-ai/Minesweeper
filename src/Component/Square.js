import React from 'react'

const Square = (props) => {
  return (
    <React.Fragment
    >
      { props.reveal || props.gameOver || props.playerWon ?
        <button
          style={{ background: '#d1d2d3' }}
        >
          {props.element !== 0 ? props.element : ''}
        </button>
          :
        <button
          onClick={props.onClick}
          onMouseDown={props.handleRightClick}
        >
          {props.flag ? <p>🚩</p> : ''}
        </button>
      }
    </React.Fragment>
  )
}
export default Square
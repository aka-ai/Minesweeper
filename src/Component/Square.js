import React from 'react'

const Square = (props) => {
  return (
    <React.Fragment
    >
      { props.reveal ?
        <button>{props.element !== 0 ? props.element : ''}</button>
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
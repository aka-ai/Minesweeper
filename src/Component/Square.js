import React from 'react'

const Square = (props) => {
  return (
    <React.Fragment
    >
      { props.reveal ?
          <button>{props.element}</button>
        :
        <button onClick={props.onClick}> 
        </button>
      }
    </React.Fragment>
  )
}
export default Square
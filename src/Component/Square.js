import React from 'react'

const Square = (props) => {
  return (
    <React.Fragment>
      { props.reveal ?
          <button>
            <p>{props.element}</p>
          </button>
        :
          <button></button>
      }
    </React.Fragment>
  )
}
export default Square
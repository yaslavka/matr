import React from 'react'
import '../stylesheets/PassButton.css'

// eslint-disable-next-line react/prop-types
const PassButton = ({ show, text, pass }) => {
  const style = {
    opacity: show ? 1 : 0,
    cursor: show ? 'pointer' : 'default',
  }

  return (
    <g
      className="pass-button"
      style={style}
      onClick={(e) => {
        e.preventDefault()
        pass()
      }}
    >
      <rect />
      <text>{text}</text>
    </g>
  )
}

export default PassButton

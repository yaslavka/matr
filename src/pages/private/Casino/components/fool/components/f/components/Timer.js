import React from 'react'
import '../stylesheets/Timer.css'

// eslint-disable-next-line react/prop-types
const Timer = ({ timer }) => {
  if (timer === null) return null

  return (
    <g className="timer">
      <rect />
      <text>{timer}</text>
    </g>
  )
}

export default Timer

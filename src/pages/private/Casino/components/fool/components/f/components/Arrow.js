import React from 'react'
import * as helpers from '../lib/helpers'
import '../stylesheets/Arrow.css'

// eslint-disable-next-line react/prop-types
const Arrow = ({ field, defenderIndex, playersCount, userIndex }) => {
  if (defenderIndex === null) return null
  const angle = ((defenderIndex - userIndex) * 360) / playersCount
  // eslint-disable-next-line react/prop-types
  const fromCenter = (field.width - field.playerSpace * 2) / 2 - 35
  const relativeToCenter = helpers.findRightTriangleSides(angle + 95, fromCenter)
  // eslint-disable-next-line react/prop-types
  const x = field.width / 2 + relativeToCenter.x
  // eslint-disable-next-line react/prop-types
  const y = field.height / 2 + relativeToCenter.y

  const style = {
    transform: `rotate(${angle}deg) translate(${x}px, ${y}px)`,
    transformOrigin: `${x}px ${y}px`,
  }

  return <polygon className="arrow" points="0,0 28,0 14,28" x={0} y={0} style={style} />
}

export default Arrow

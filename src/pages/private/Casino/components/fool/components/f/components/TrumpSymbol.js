import React from 'react'
import AppContext from '../context/AppContext'

// eslint-disable-next-line react/prop-types
const TrumpSymbol = ({ placeCenter }) => {
  const cardSize = {
    width: 50,
    height: 77.78,
  }

  const coords = {
    // eslint-disable-next-line react/prop-types
    x: placeCenter.x - cardSize.width / 2,
    // eslint-disable-next-line react/prop-types
    y: placeCenter.y - cardSize.height / 2,
  }

  return (
    <AppContext.Consumer>
      {({ trumpSuit }) => {
        if (trumpSuit) {
          return (
            <image
              x={0}
              y={0}
              width={cardSize.width}
              height={cardSize.height}
              href={`/images/card-suits/${trumpSuit}.svg`}
              style={{ transform: `translate(${coords.x}px, ${coords.y}px)` }}
            />
          )
        } else return null
      }}
    </AppContext.Consumer>
  )
}

export default TrumpSymbol

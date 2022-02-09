import React, { Fragment } from 'react'
import Card from './Card'
import * as helpers from '../lib/helpers'

const PlayerCards = (props) => {
  // eslint-disable-next-line react/prop-types
  const { players, playerCardsPosition, userIndex } = props
  const allCards = []

  // eslint-disable-next-line react/prop-types
  for (const [playerIndex, cards] of players.entries()) {
    // eslint-disable-next-line react/prop-types
    const { angle, ...placeCenter } = playerCardsPosition[playerIndex]
    for (const [cardIndex, card] of cards.entries()) {
      const oneCardShift = playerIndex === userIndex ? 20 : 5
      const shift = (cardIndex - (cards.length - 1) / 2) * oneCardShift
      const relativeToPlaceCenter = helpers.findRightTriangleSides(angle, shift)
      const coords = {
        x: placeCenter.x + relativeToPlaceCenter.x,
        y: placeCenter.y + relativeToPlaceCenter.y,
      }

      allCards.push({
        ...card,
        rotation: angle,
        coords,
        side: playerIndex === userIndex ? 'front' : 'back',
        activePlayer: playerIndex === userIndex,
      })
    }
  }

  return (
    <Fragment>
      {allCards.map((card) => (
        <Card {...card} key={card.id} />
      ))}
    </Fragment>
  )
}

export default PlayerCards

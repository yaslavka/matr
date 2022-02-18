import React, { Fragment } from 'react'
import DeckCards from './DeckCards'
import PlayerCards from './PlayerCards'
import TableCards from './TableCards'
import DiscardedCards from './DiscardedCards'
import * as helpers from '../lib/helpers'

const Cards = (props) => {
  // eslint-disable-next-line react/prop-types
  const { cards, field, players, userIndex } = props
  const findPlayerCardsPosition = () => {
    // eslint-disable-next-line react/prop-types
    const avgSide = (field.width + field.height) / 2
    // eslint-disable-next-line react/prop-types
    const fromCenterToPlayerCards = avgSide / 2 - field.playerSpace / 2

    // eslint-disable-next-line react/prop-types
    return Array.from({ length: players.length }, (_, i) => {
      // eslint-disable-next-line react/prop-types
      const angle = ((i - userIndex) * 360) / players.length
      const relativeToCenterCoords = helpers.findRightTriangleSides(
        angle + 90,
        fromCenterToPlayerCards,
      )
      return {
        angle,
        // eslint-disable-next-line react/prop-types
        x: field.width / 2 + relativeToCenterCoords.x,
        // eslint-disable-next-line react/prop-types
        y: field.height / 2 + relativeToCenterCoords.y,
      }
    })
  }

  const placeCenters = {
    deck: {
      // eslint-disable-next-line react/prop-types
      x: field.width * 0.36,
      // eslint-disable-next-line react/prop-types
      y: field.height * 0.5,
    },
    table: {
      // eslint-disable-next-line react/prop-types
      x: field.width * 0.55,
      // eslint-disable-next-line react/prop-types
      y: field.height * 0.48,
    },
    discarded: {
      // eslint-disable-next-line react/prop-types
      x: field.width * 1.7,
      // eslint-disable-next-line react/prop-types
      y: field.height * 0.5,
    },
  }

  return (
    <Fragment>
      {/* eslint-disable-next-line react/prop-types */}
      <DeckCards cards={cards.deck} placeCenter={placeCenters.deck} />
      <PlayerCards
        /* eslint-disable-next-line react/prop-types */
        players={cards.players}
        playerCardsPosition={findPlayerCardsPosition()}
        userIndex={userIndex}
      />
      {/* eslint-disable-next-line react/prop-types */}
      <TableCards attacks={cards.table} placeCenter={placeCenters.table} />
      {/* eslint-disable-next-line react/prop-types */}
      <DiscardedCards cards={cards.discarded} placeCenter={placeCenters.discarded} />
    </Fragment>
  )
}

export default Cards

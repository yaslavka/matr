import React, { Fragment } from 'react'
import Card from './Card'

// eslint-disable-next-line react/prop-types
const TableCards = ({ attacks, placeCenter }) => {
  const allCards = []
  // eslint-disable-next-line react/prop-types
  for (const [attackIndex, attack] of attacks.entries()) {
    for (const [cardIndex, card] of attack.entries()) {
      const attacking = cardIndex === 0
      const shift = {}
      // eslint-disable-next-line react/prop-types
      if (attacks.length > 3) {
        if (attackIndex > 2) {
          // eslint-disable-next-line react/prop-types
          shift.x = attackIndex - 3 - (attacks.length - 4) / 2
          shift.y = 1
        } else {
          shift.x = attackIndex - 1
          shift.y = -1
        }
      } else {
        // eslint-disable-next-line react/prop-types
        shift.x = attackIndex - (attacks.length - 1) / 2
        shift.y = 0
      }

      if (!attacking) {
        shift.x += 0.05
        shift.y += 0.4
      }

      shift.x = shift.x * 70
      shift.y = shift.y * 60

      const coords = {
        // eslint-disable-next-line react/prop-types
        x: placeCenter.x + shift.x,
        // eslint-disable-next-line react/prop-types
        y: placeCenter.y + shift.y,
      }

      allCards.push({ ...card, coords, side: 'front' })
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

export default TableCards

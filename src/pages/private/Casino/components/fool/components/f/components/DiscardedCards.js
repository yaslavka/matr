import React, { Fragment } from 'react'
import Card from './Card'

// eslint-disable-next-line react/prop-types
const DiscardedCards = ({ cards, placeCenter }) => (
  <Fragment>
    {/* eslint-disable-next-line react/prop-types */}
    {cards.map((card) => (
      <Card {...card} key={card.id} coords={{ ...placeCenter }} side="back" />
    ))}
  </Fragment>
)

export default DiscardedCards

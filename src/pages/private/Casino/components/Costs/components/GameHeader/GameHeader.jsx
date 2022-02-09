/**
 * Slot Spinner - Game
 *
 * @category   Application_Frontend
 * @package    slot-spinner
 * @author     Suman Barua
 * @developer  Suman Barua <sumanbarua576@gmail.com>
 **/

import React from 'react'

// eslint-disable-next-line react/prop-types
const GameHeader = ({ winnerActive }) => {
  // is winner or loser badge active?
  let winnerBadgeClass = 'winner-badge'
  if (winnerActive === 1) winnerBadgeClass += ' winner-badge-active'
  else if (winnerActive === 2) winnerBadgeClass += ' loser-badge-active'

  // return game header
  return (
    <div className="row mt-3">
      <div className={winnerBadgeClass}></div>
    </div>
  )
}

export default GameHeader

/**
 * Slot Spinner - Game
 *
 * @category   Application_Frontend
 * @package    slot-spinner
 * @author     Suman Barua
 * @developer  Suman Barua <sumanbarua576@gmail.com>
 **/

import React from 'react'
import PlayerBet from './PlayerBet'
import PlayerCredits from './PlayerCredits'
import WinningStats from './WinningStats'

// eslint-disable-next-line react/prop-types
const GameFooter = ({ data, onClick }) => {
  // get props data
  // eslint-disable-next-line react/prop-types
  const { credits, playerBet, playerWins } = data

  // return game footer
  return (
    <div className="display-section row">
      <PlayerBet playerBet={playerBet} onClick={onClick} />
      <PlayerCredits credits={credits} />
      <WinningStats playerWins={playerWins} playerBet={playerBet} />
    </div>
  )
}

export default GameFooter

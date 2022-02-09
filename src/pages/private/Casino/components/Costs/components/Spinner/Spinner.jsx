/**
 * Slot Spinner - Game
 *
 * @category   Application_Frontend
 * @package    slot-spinner
 * @author     Suman Barua
 * @developer  Suman Barua <sumanbarua576@gmail.com>
 **/

import React, { Component } from 'react'
import $ from 'jquery'
import SlotSpinner from './SlotSpinner'
import GameHeader from '../GameHeader/GameHeader'
import GameBody from '../GameBody/GameBody'
import GameFooter from '../GameFooter/GameFooter'
import Celebrate from '../Celebrate/Celebrate'
//import Loading from '../Loading/Loading'
import Sounds from '../Sounds/Sounds'

class Spinner extends Component {
  state = {
    symbols: 12,
    reelCount: 3,
    height: 126,
    width: 148,
    credits: 5000,
    playerBet: 0,
    playerWins: 0,
    winnerActive: 0,
    isSpinning: 0,
    winningSet: [],
  }

  componentDidMount = () => {
    // play brackground sound
    Sounds.background().play()

    //using images instead, and more reels
    const spinnerBoard = this.initiateSlotSpinner()

    // spin the game slots
    $('.spin-slot').click(() => {
      let { playerBet, isSpinning } = this.state

      // check reel spinning or not?
      // do not allow multi-clicking if reel spining
      if (isSpinning) {
        // play warning sound
        Sounds.warning().play()

        // return null
        return null
      }

      // check if valid bet is done or not?
      if (!playerBet) {
        // play warning sound
        Sounds.warning().play()

        // warning message
        alert('Please select bet first!')

        // return null
        return null
      }

      // disable bet while reel spinning
      isSpinning = 1
      this.setState({ isSpinning })

      // play spinning sound
      Sounds.spinning().play()

      // start spining
      spinnerBoard.spin()
    })
  }

  // initiate slot spinner
  initiateSlotSpinner = function () {
    // get state values
    const symbols = []
    const { symbols: images, height, width, reelCount, winningSet } = this.state

    // prepare symbols list
    for (let i = 1; i <= images; i++) {
      symbols.push(`<img src="/images/symbols/${i}.png"  alt=""/>`)
    }

    // get instance of constructor function
    return new SlotSpinner('spinner-board', {
      reelCount,
      winningSet,
      symbols,
      height,
      width,
      callback: this.callbackFunction,
    })
  }

  // callback function
  callbackFunction = (result) => {
    // stop spinning sound
    Sounds.spinning().pause()

    // calculate number of maximum occurance
    const unique = [...new Set(result)]
    const maxOccurance = Math.max(
      ...unique.map((item1) => [result.filter((item2) => item1 === item2).length]),
    )

    // check winner or loser?
    let { credits, playerBet, playerWins, winnerActive, isSpinning } = this.state

    if (maxOccurance >= 2) {
      // if player wins
      playerWins += 1
      credits += playerBet * 2
      playerBet = 0
      winnerActive = 1

      // play success sound
      Sounds.success().play()

      // play winning sound
      Sounds.winning().play()
    } else {
      // if player lose
      credits -= playerBet
      playerBet = 0
      winnerActive = 2

      // play notification sound
      Sounds.warning().play()

      // playing losing sound
      Sounds.losing().play()
    }
    // enable bet again after game over
    isSpinning = 0

    // set state
    this.setState({ credits, playerBet, playerWins, winnerActive, isSpinning })
  }

  // change bet
  handleUserBet = (maxBet) => {
    // get state values
    let { credits, playerBet, winnerActive, isSpinning } = this.state

    // check reel spinning or not?
    // do not allow betting if reel spining
    if (isSpinning) {
      // play warning sound
      Sounds.warning().play()

      // return null
      return null
    }

    // check credit empty?
    if (credits <= 0) {
      // play warning sound
      Sounds.warning().play()

      // show alert message
      alert('Your credit finished! Please reload the browser for recharging credits!')

      // return null
      return null
    }

    // play clicking sound
    Sounds.clicking().play()

    // change player-bet
    winnerActive = 0
    if (!maxBet) {
      // check if credit available or not?
      if (playerBet >= credits) playerBet = 0

      // set player bet one
      playerBet = playerBet + 1
      this.setState({ playerBet, winnerActive })
    } else {
      // set player max bet
      this.setState({ playerBet: credits, winnerActive })
    }
  }

  render() {
    // get state values
    const winnerActive = this.state.winnerActive

    // return the spinner game
    return (
      <div>
        <div>
          <GameHeader winnerActive={winnerActive} />
          <GameBody />
          <GameFooter data={this.state} onClick={this.handleUserBet} />
          <Celebrate winnerActive={winnerActive} />
        </div>
      </div>
    )
  }
}

export default Spinner

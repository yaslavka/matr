/**
 * Slot Spinner - Game
 *
 * @category   Application_Frontend
 * @package    slot-spinner
 * @author     Suman Barua
 * @developer  Suman Barua <sumanbarua576@gmail.com>
 **/

import React, { Component } from 'react'
import Sounds from '../Sounds/Sounds'
import Button from '@material-ui/core/Button'

class WinningStats extends Component {
  // state = {};

  // handle mouser over
  handleMouseOver = () => {
    // play clicking sound
    Sounds.clicking().play()
  }

  render() {
    // get props data
    // eslint-disable-next-line react/prop-types
    const { playerWins, playerBet } = this.props

    // is spinner enabled?
    const spinnerClass = !playerBet ? 'spin-slot spin-slot-disabled' : 'spin-slot'

    // render winning statistics
    return (
      <div className="col-12 col-lg-3">
        <div className="row">
          <div className="col-8 col-lg-12">
            <div className="winning-display">{playerWins}</div>
          </div>
          <div className="col-4">
            <button onMouseOver={this.handleMouseOver} className={spinnerClass}>
              &nbsp;
            </button>
          </div>
        </div>
      </div>
    )
  }
}

export default WinningStats

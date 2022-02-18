import React, { Component } from 'react'

import { connect } from 'react-redux'
import { mapStateToProps, mapDispatchToProps } from '../reducer'

export class CoinToss extends Component {
  constructor(props) {
    super()

    this.state = {
      lastOutcome: null,
      lastTossWon: null,
      betAmount: 100,
      lastBetAmount: null,
    }
  }

  clipAndUpdateBet = (value) => {
    // eslint-disable-next-line react/prop-types
    value = value > this.props.chips ? this.props.chips : value
    value = value < 1 ? 1 : value

    this.setState({
      betAmount: value,
    })
  }

  isBetTooHigh = () => {
    // eslint-disable-next-line react/prop-types
    return this.state.betAmount > this.props.chips
  }

  tossCoin = (userGuess) => {
    const outcome = Math.round(Math.random())
    const tossWon = userGuess === outcome

    this.setState({
      lastOutcome: outcome,
      lastTossWon: tossWon,
      lastBetAmount: this.state.betAmount,
    })

    // eslint-disable-next-line react/prop-types
    this.props.adjustChips(this.state.betAmount * (tossWon ? 1 : -1))
  }

  render() {
    return (
      <div>
        <h2>Münzwurf</h2>

        <label>
          Wette Eingeben:
          <br />
          <input
            type="number"
            name="bet"
            value={this.state.betAmount}
            min="1"
            /* eslint-disable-next-line react/prop-types */
            max={this.props.chips}
            onChange={(event) => this.clipAndUpdateBet(event.target.value)}
          />
          <br />
          {this.isBetTooHigh() ? (
            <div className="bet-excessive-indicator">Wette zu hoch!</div>
          ) : (
            <></>
          )}
        </label>

        <div id="controls">
          <button disabled={this.isBetTooHigh()} onClick={() => this.tossCoin(0)}>
            Kopf
          </button>
          <button disabled={this.isBetTooHigh()} onClick={() => this.tossCoin(1)}>
            Zahl
          </button>
        </div>

        {this.state.lastOutcome !== null ? (
          <div>
            <h3>Letzter Wurf: {this.state.lastOutcome === 0 ? 'Kopf' : 'Zahl'}</h3>

            {this.state.lastTossWon ? (
              <div className="win-indicator">
                <span>Wurf gewonnen!</span>
                <br />
                <span>+{this.state.lastBetAmount} Chips!</span>
              </div>
            ) : (
              <div className="loss-indicator">
                <span>Wurf verloren...</span>
                <br />
                <span>-{this.state.lastBetAmount} Chips.</span>
              </div>
            )}
          </div>
        ) : (
          <h3>Versuchen Sie Ihr Glück!</h3>
        )}
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CoinToss)

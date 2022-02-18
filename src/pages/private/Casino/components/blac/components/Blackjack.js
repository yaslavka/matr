import React, { Component } from 'react'

import { connect } from 'react-redux'
import { mapStateToProps, mapDispatchToProps } from '../reducer'

import './blackjack.css'

class Blackjack extends Component {
  constructor(props) {
    super()

    this.state = {
      deck: [],
      playerCards: [],
      dealerCards: [],
      winner: 'tie',
      roundInProgress: false,
      roundEnding: false,
      betAmount: 100,
      lastPayout: 0,
    }
  }

  generateShuffledDeck = () => {
    var deck = this.generateDeck()
    this.fisherYatesShuffle(deck)

    return deck
  }

  generateDeck = () => {
    const suits = ['♠', '♥', '♦', '♣']
    const ranks = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'B', 'D', 'K']

    var deck = []

    for (let suit of suits) {
      for (let rank of ranks) {
        deck.push({ suit: suit, rank: rank })
      }
    }

    return deck
  }

  fisherYatesShuffle = (deck) => {
    var n = deck.length

    while (n) {
      var pickedIndex = Math.floor(Math.random() * n)

      n--

      var temp = deck[pickedIndex]
      deck[pickedIndex] = deck[n]
      deck[n] = temp
    }
  }

  clipAndUpdateBet = (value) => {
    // eslint-disable-next-line react/prop-types
    value = value > this.props.chips ? this.props.chips : value
    value = value < 1 ? 1 : value

    this.setState({
      betAmount: Number(value),
    })
  }

  isBetTooHigh = () => {
    // eslint-disable-next-line react/prop-types
    return this.state.betAmount > this.props.chips
  }

  isDealerCardHidden(index) {
    return this.state.roundInProgress && !this.state.roundEnding && index !== 0
  }

  getPlayerScoreDisplayClass = () => {
    return this.state.winner === 'player'
      ? 'score-display-winner'
      : this.state.winner === 'dealer'
      ? 'score-display-loser'
      : 'score-display-tie'
  }

  getDealerScoreDisplayClass = () => {
    return this.state.winner === 'dealer'
      ? 'score-display-winner'
      : this.state.winner === 'player'
      ? 'score-display-loser'
      : 'score-display-tie'
  }

  startRound = () => {
    var deck = this.generateShuffledDeck()

    var playerCards = [deck.pop(), deck.pop()]
    var dealerCards = [deck.pop(), deck.pop()]

    //playerCards = [{suit: '♥', rank: 'A'}, {suit: '♥', rank: '10'}];
    //dealerCards = [{suit: '♥', rank: 'A'}, {suit: '♥', rank: '10'}];

    this.setState(
      {
        deck: deck,
        playerCards: playerCards,
        dealerCards: dealerCards,
        roundInProgress: true,
        roundEnding: false,
      },
      this.checkBlackjacks,
    )
  }

  checkBlackjacks = () => {
    var playerBlackjack = this.isBlackjack(this.state.playerCards)
    var dealerBlackjack = this.isBlackjack(this.state.dealerCards)

    if (playerBlackjack || dealerBlackjack) {
      var winner
      var winnings

      if (playerBlackjack && !dealerBlackjack) {
        console.log('Player Blackjack Payout')
        winner = 'player'
        winnings = 3 * Math.floor(this.state.betAmount / 2)
      } else if (dealerBlackjack && !playerBlackjack) {
        winner = 'dealer'
        winnings = -1 * this.state.betAmount
      } else {
        winner = 'tie'
        winnings = 0
      }

      this.payout(winnings)

      this.setState({
        roundEnding: true,
        winner: winner,
        lastPayout: winnings,
      })
    }
  }

  isBlackjack(hand) {
    if (hand.length === 2) {
      return this.getHandValue(hand) === 21
    }

    return false
  }

  isBusted(hand = []) {
    return this.getHandValue(hand) > 21
  }

  getHandValue(hand) {
    var sum = 0
    var aces = 0

    for (let card of hand) {
      switch (card.rank) {
        case 'B':
        case 'D':
        case 'K':
          sum += 10
          break
        case 'A':
          sum += 11
          aces++
          break
        default:
          sum += Number(card.rank)
          break
      }

      while (sum > 21 && aces) {
        sum -= 10
        aces--
      }
    }

    return sum
  }

  hit = (endAfterHit = false) => {
    this.setState(
      (prevState) => {
        var deck = prevState.deck

        if (deck.length) {
          var playerCards = [...prevState.playerCards, deck.pop()]

          var playerBust = this.isBusted(playerCards)

          return {
            deck: deck,
            playerCards: playerCards,
            roundEnding: playerBust,
          }
        }
      },
      () => {
        if (this.state.roundEnding) {
          this.checkWinner()
        } else if (endAfterHit === true) {
          this.stand()
        }
      },
    )
  }

  stand = () => {
    this.setState((prevState) => {
      var deck = prevState.deck
      var dealerCards = prevState.dealerCards

      while (deck.length && this.getHandValue(dealerCards) < 17) {
        dealerCards = [...dealerCards, deck.pop()]
      }

      return {
        dealerCards: dealerCards,
        roundEnding: true,
      }
    }, this.checkWinner)
  }

  double = () => {
    // eslint-disable-next-line react/prop-types
    if (this.props.chips >= 2 * this.state.betAmount) {
      this.setState({
        betAmount: 2 * this.state.betAmount,
      })

      this.hit(true)
    }
  }

  checkWinner = () => {
    if (this.state.roundEnding) {
      var playerScore = this.getHandValue(this.state.playerCards)
      var dealerScore = this.getHandValue(this.state.dealerCards)

      var winner = 'tie'
      var winnings = 0

      if (playerScore <= 21 && (playerScore > dealerScore || dealerScore > 21)) {
        winner = 'player'
        winnings = this.state.betAmount
      } else if (dealerScore <= 21 && (dealerScore > playerScore || playerScore > 21)) {
        winner = 'dealer'
        winnings = -1 * this.state.betAmount
      }

      this.payout(winnings)

      this.setState({
        winner: winner,
        lastPayout: winnings,
      })
    }
  }

  payout = (amount) => {
    // eslint-disable-next-line react/prop-types
    this.props.adjustChips(amount)
  }

  render() {
    return (
      <div>
        <h2>Blackjack</h2>
        <div>
          {(this.state.roundEnding || !this.state.roundInProgress) && (
            <form
              className="bet-form"
              onSubmit={() => {
                return false
              }}
            >
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
              <div>
                <button type="submit" disabled={this.isBetTooHigh()} onClick={this.startRound}>
                  Neue Runde
                </button>
              </div>
            </form>
          )}

          {this.state.roundInProgress && (
            <div>
              {!this.state.roundEnding && (
                <div id="controls">
                  <button onClick={this.hit}>Hit</button>
                  <button onClick={this.stand}>Stand</button>
                  <button
                    onClick={this.double}
                    /* eslint-disable-next-line react/prop-types */
                    disabled={this.props.chips < 2 * this.state.betAmount}
                  >
                    Double
                  </button>
                </div>
              )}
              <div id="card-display-wrapper">
                <div id="card-display-player" className="card-display">
                  <div>
                    <h3>Deine Karten</h3>

                    <div className="card-wrapper">
                      {this.isBusted(this.state.playerCards) && (
                        <div id="player-bust" className="bust-indicator">
                          BUSTED
                        </div>
                      )}

                      {this.state.playerCards.map((card) => {
                        return (
                          <div
                            key={card.suit + card.rank}
                            className={['♥', '♦'].includes(card.suit) ? 'red-text' : ''}
                          >
                            {card.suit + ' ' + card.rank}
                          </div>
                        )
                      })}
                    </div>

                    {this.isBlackjack(this.state.playerCards) && (
                      <div id="player-blackjack" className="blackjack-indicator">
                        BLACK
                        <br />
                        JACK
                      </div>
                    )}
                  </div>

                  {this.state.roundEnding && (
                    <div className={'score-display ' + this.getPlayerScoreDisplayClass()}>
                      {this.getHandValue(this.state.playerCards)}
                    </div>
                  )}
                </div>

                <div id="card-display-dealer" className="card-display">
                  <div>
                    <h3>Dealer-Karten</h3>

                    <div className="card-wrapper">
                      {this.isBusted(this.state.dealerCards) && (
                        <div id="dealer-bust" className="bust-indicator">
                          BUSTED
                        </div>
                      )}

                      {this.state.dealerCards.map((card, index) => {
                        return (
                          <div
                            key={card.suit + card.rank}
                            className={
                              this.isDealerCardHidden(index)
                                ? 'gray-text'
                                : ['♥', '♦'].includes(card.suit)
                                ? 'red-text'
                                : ''
                            }
                          >
                            {this.isDealerCardHidden(index) ? '? ?' : card.suit + ' ' + card.rank}
                          </div>
                        )
                      })}
                    </div>

                    {this.isBlackjack(this.state.dealerCards) && (
                      <div id="dealer-blackjack" className="blackjack-indicator">
                        BLACK
                        <br />
                        JACK
                      </div>
                    )}
                  </div>

                  {this.state.roundEnding && (
                    <div className={'score-display ' + this.getDealerScoreDisplayClass()}>
                      {this.getHandValue(this.state.dealerCards)}
                    </div>
                  )}
                </div>
              </div>
              {this.state.roundEnding ? (
                this.state.winner === 'player' ? (
                  <div className="win-indicator">
                    Runde gewonnen!
                    <br />+{this.state.lastPayout} Chips!
                  </div>
                ) : this.state.winner === 'dealer' ? (
                  <div className="loss-indicator">
                    Runde veloren...
                    <br />
                    {this.state.lastPayout} Chips.
                  </div>
                ) : (
                  <div className="tie-indicator">Unentschieden...</div>
                )
              ) : (
                <div className="bet-indicator">Wette: {this.state.betAmount}</div>
              )}
            </div>
          )}
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Blackjack)

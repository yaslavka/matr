import React, { Component } from 'react'
import websocket from '../websocket'
import AppContext from '../context/AppContext'
import Menu from './Menu'
import WaitPage from './WaitPage'
import Table from './Table'
import Cards from './Cards'
import PassButton from './PassButton'
import Arrow from './Arrow'
import Timer from './Timer'
import Filters from './Filters'
import GameState from '../lib/GameState'
import delayedFunctions from '../lib/delayed-functions'
import * as helpers from '../lib/helpers'
import '../stylesheets/App.css'

class Gamee extends Component {
  constructor(props) {
    super(props)
    this.state = {
      viewport: {
        width: 1024,
        height: 768,
      },
      isPlaying: false,
      isWaiting: false,
      userIndex: 0,
      username: '',
      mode: 'single-player',
      playersNumber: 2,
      players: [],
      cards: {
        deck: [],
        players: [],
        table: [],
        discarded: [],
      },
      possibleCards: [],
      attacker: null,
      defender: null,
      trumpSuit: null,
      loser: null,
      showButton: false,
      movedCard: null,
      timer: null,
    }

    this.timeout = null
    this.gameState = null
    this.cardStyles = null
    this.handleStateUpdate = this.handleStateUpdate.bind(this)
    this.updateViewport = this.updateViewport.bind(this)
    this.startGame = this.startGame.bind(this)
    this.makeMove = this.makeMove.bind(this)
    this.pass = this.pass.bind(this)
    this.updateCardStyles = this.updateCardStyles.bind(this)
    this.addMovedCard = this.addMovedCard.bind(this)
    this.removeMovedCard = this.removeMovedCard.bind(this)
    this.changeName = this.changeName.bind(this)
    this.changeMode = this.changeMode.bind(this)
    this.changePlayersNumber = this.changePlayersNumber.bind(this)
    this.saveUserSettings = this.saveUserSettings.bind(this)
    this.waitUsers = this.waitUsers.bind(this)
    this.cancelWaiting = this.cancelWaiting.bind(this)
    this.startMultiplayGame = this.startMultiplayGame.bind(this)
    this.reduceTimer = this.reduceTimer.bind(this)
  }

  getUserSettings() {
    const settingsString = localStorage.getItem('settings')
    if (settingsString) {
      const settings = JSON.parse(settingsString)
      const { username, mode, playersNumber } = settings
      this.setState({ username, mode, playersNumber })
    }
  }

  saveUserSettings() {
    const { username, mode, playersNumber } = this.state
    const settingsString = JSON.stringify({ username, mode, playersNumber })
    localStorage.setItem('settings', settingsString)
  }

  changeName(name) {
    this.setState({ username: name })
  }

  changeMode(mode) {
    this.setState({ mode })
  }

  changePlayersNumber(number) {
    this.setState({ playersNumber: number })
  }

  waitUsers() {
    this.setState({ isWaiting: true })
  }

  cancelWaiting() {
    this.setState({ isWaiting: false })
  }

  startMultiplayGame() {
    this.setState({ isWaiting: false, isPlaying: true })
    websocket.listen((type, msgObj) => {
      if (type === 'message' && msgObj.type === 'gameStateUpdate') {
        delayedFunctions.add(() => this.handleStateUpdate(msgObj.data.updates))
      }
    })
  }

  addObserver() {
    return this.gameState.observable.subscribe((updates) => {
      delayedFunctions.add(() => this.handleStateUpdate(updates))
    })
  }

  updateCardStyles(cardId, style) {
    this.cardStyles = {
      ...this.cardStyles,
      [cardId]: style,
    }
  }

  updateViewport() {
    const html = document.documentElement
    const width = html.clientWidth
    const height = html.clientHeight
    this.setState({
      viewport: { width, height },
    })
  }

  addResizeListener() {
    let throttled = false
    const fn = () => {
      if (!throttled) {
        throttled = true
        setTimeout(() => {
          throttled = false
          this.updateViewport()
        }, 300)
      }
    }
    window.addEventListener('resize', fn)
    return () => window.removeEventListener('resize', fn)
  }

  genPlayers(playersNumber) {
    const players = Array.from({ length: playersNumber }, (_, i) => ({ name: 'Player' + i }))
    return players
  }

  handleStateUpdate(updates) {
    const updateObject = {}
    for (let { prop, value } of updates) {
      updateObject[prop] = value
    }

    this.setState(updateObject)
  }

  addMovedCard(cardId) {
    this.setState({ movedCard: cardId })
  }

  removeMovedCard() {
    this.setState({ movedCard: null })
  }

  startGame() {
    const { playersNumber } = this.state
    this.gameState = new GameState()
    this.unsubscribe = this.addObserver()
    this.setState({
      isPlaying: true,
      players: this.genPlayers(playersNumber),
    })

    this.gameState.initNewGame(playersNumber)
    this.gameState.startGame()
  }

  makeMove(cardId) {
    if (this.state.mode === 'single-player') {
      this.gameState.makeUserMove(cardId)
    } else {
      websocket.send({ type: 'move', data: { cardId } })
    }
  }

  pass() {
    if (this.state.mode === 'single-player') {
      this.gameState.pass()
    } else {
      websocket.send({ type: 'pass' })
    }
  }

  skip() {
    websocket.send({ type: 'skip' })
  }

  handleStartTrick(prevState) {
    if (this.state.mode === 'multiplayer') return
    const prevAttacks = prevState.cards.table
    const currAttacks = this.state.cards.table
    const prevTrump = prevState.trumpSuit
    const currTrump = this.state.trumpSuit
    const tableGetEmpty = !!prevAttacks.length && !currAttacks.length
    const trumpHasChosen = !prevTrump && currTrump
    if (tableGetEmpty || trumpHasChosen) this.gameState.startTrick()
  }

  handleShowButton(prevState) {
    const { possibleCards: prevPossibleCards } = prevState
    const {
      possibleCards,
      cards: { table: attacks },
      showButton,
    } = this.state
    if (possibleCards.length && attacks.length) {
      if (prevPossibleCards.length !== possibleCards.length && !showButton) {
        this.setState({ showButton: true })
      }
    } else if (showButton) this.setState({ showButton: false })
  }

  handleEndGame(prevState) {
    if (prevState.isPlaying && !this.state.isPlaying) {
      if (this.state.mode === 'multiplayer') {
        websocket.close()
      } else {
        this.gameState = null
        this.unsubscribe()
      }
    }
  }

  reduceTimer() {
    const { timer } = this.state
    this.setState({ timer: timer - 1 })
    if (timer === 1) this.skip()
    else this.timeout = setTimeout(this.reduceTimer, 1000)
  }

  handleTimerUpdate(prevState) {
    if (this.state.mode === 'multiplayer') {
      if (prevState.possibleCards.length !== this.state.possibleCards.length) {
        if (this.state.possibleCards.length) {
          this.setState({ timer: 10 })
          if (this.timeout) clearTimeout(this.timeout)
          this.timeout = setTimeout(this.reduceTimer, 1000)
        } else {
          this.setState({ timer: null })
          if (this.timeout) clearTimeout(this.timeout)
        }
      }
    }
  }

  componentDidMount() {
    this.updateViewport()
    this.getUserSettings()
    this.removeListener = this.addResizeListener()
  }

  componentDidUpdate(_, prevState) {
    this.handleStartTrick(prevState)
    this.handleShowButton(prevState)
    this.handleEndGame(prevState)
    this.handleTimerUpdate(prevState)
  }

  componentWillUnmount() {
    if (this.removeListener) this.removeListener()
    if (this.unsubscribe) this.unsubscribe()
  }

  render() {
    const field = helpers.getFieldProps(this.state.viewport)
    return (
      <AppContext.Provider
        value={{
          // eslint-disable-next-line react/prop-types
          lang: this.props.lang,
          cardStyles: this.cardStyles,
          possibleCards: this.state.possibleCards,
          trumpSuit: this.state.trumpSuit,
          movedCard: this.state.movedCard,
          updateCardStyles: this.updateCardStyles,
          makeMove: this.makeMove,
          addMovedCard: this.addMovedCard,
          removeMovedCard: this.removeMovedCard,
        }}
      >
        <Menu
          field={field}
          isPlaying={this.state.isPlaying}
          username={this.state.username}
          mode={this.state.mode}
          playersNumber={this.state.playersNumber}
          changeName={this.changeName}
          changeMode={this.changeMode}
          changePlayersNumber={this.changePlayersNumber}
          startGame={this.startGame}
          waitUsers={this.waitUsers}
          saveUserSettings={this.saveUserSettings}
        />
        <WaitPage
          field={field}
          username={this.state.username}
          playersNumber={this.state.playersNumber}
          isPlaying={this.state.isPlaying}
          isWaiting={this.state.isWaiting}
          cancelWaiting={this.cancelWaiting}
          startMultiplayGame={this.startMultiplayGame}
        />
        <svg className="appp">
          <g className="fields">
            <Table field={field} />
            <Cards
              cards={this.state.cards}
              field={field}
              players={this.state.players}
              userIndex={this.state.userIndex}
            />
            <PassButton
              show={this.state.showButton}
              text={
                this.state.defender === this.state.userIndex
                  ? // eslint-disable-next-line react/prop-types
                    this.props.lang === 'ru'
                    ? 'Взять'
                    : 'Pick up'
                  : // eslint-disable-next-line react/prop-types
                  this.props.lang === 'ru'
                  ? 'Пас'
                  : 'Pass'
              }
              pass={this.state.showButton ? this.pass : null}
            />
            <Arrow
              field={field}
              defenderIndex={this.state.defender}
              playersCount={this.state.players.length}
              userIndex={this.state.userIndex}
            />
            <Timer timer={this.state.timer} />
          </g>
          <Filters />
        </svg>
      </AppContext.Provider>
    )
  }
}

export default Gamee

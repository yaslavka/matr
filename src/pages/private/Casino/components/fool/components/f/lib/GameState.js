import config from './gameConfig'
import * as helpers from './helpers'

class GameState {
  constructor(mode) {
    this.cards = {
      deck: [],
      players: [],
      table: [],
      discarded: [],
    }
    this.userIndex = 0
    this.trumpSuit = null
    this.attacker = null
    this.defender = null
    this.defendSucceed = null
    this.activePlayers = {
      players: [],
    }
    this.maxAttacks = 0
    this.observable = {
      subscriber: null,
      subscribe(fn) {
        this.subscriber = fn
        return () => (this.subscriber = null)
      },
      update(updates) {
        this.subscriber(updates)
      },
    }
  }
  initNewGame(playersNumber) {
    const deckCards = this.shuffleCards(this.genCards())
    const playerCards = Array.from({ length: playersNumber }, () => [])
    this.cards = {
      ...this.cards,
      deck: deckCards,
      players: playerCards,
    }
    this.observable.update([{ prop: 'cards', value: this.cards }])
  }
  genCards() {
    const ranks = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A']
    const values = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]
    const suits = ['clubs', 'diamonds', 'hearts', 'spades']
    const cards = []
    for (let i = 0; i < ranks.length; i++) {
      for (let n = 0; n < suits.length; n++) {
        cards.push({
          id: `${ranks[i]}-${suits[n]}`,
          rank: ranks[i],
          suit: suits[n],
          value: values[i],
        })
      }
    }

    return cards
  }
  shuffleCards(cards) {
    const cardsCopy = helpers.getDeepCopy(cards)

    for (let i = cardsCopy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      const tmp = helpers.getDeepCopy(cardsCopy[i])
      cardsCopy[i] = helpers.getDeepCopy(cardsCopy[j])
      cardsCopy[j] = helpers.getDeepCopy(tmp)
    }

    return cardsCopy
  }
  startGame() {
    this.dealCards()
    this.chooseTrump()
    this.clearGameProps()
  }
  dealCards() {
    const dealerIndex = this.userIndex
    const playersNumber = this.cards.players.length
    const getNextIndex = (index) => (index + 1 === playersNumber ? 0 : index + 1)
    let index = getNextIndex(dealerIndex)
    while (this.cards.players[index].length < config.maxCardsAfterDealing) {
      this.dealOneCard(index)
      this.observable.update([{ prop: 'cards', value: this.cards }])
      index = getNextIndex(index)
    }
  }
  chooseTrump() {
    const deckCards = helpers.getDeepCopy(this.cards.deck)
    const randomIndex = Math.floor(Math.random() * deckCards.length)
    const card = deckCards[randomIndex]
    deckCards[randomIndex] = deckCards[0]
    deckCards[0] = { ...card, trump: true }
    this.cards = {
      ...this.cards,
      deck: deckCards,
    }
    this.trumpSuit = card.suit
    this.sortPlayerCards()
    this.observable.update([
      { prop: 'cards', value: this.cards },
      { prop: 'trumpSuit', value: this.trumpSuit },
    ])
  }
  dealOneCard(playerIndex) {
    const deckCards = helpers.getDeepCopy(this.cards.deck)
    const playerCards = helpers.getDeepCopy(this.cards.players)
    const card = deckCards.pop()
    playerCards[playerIndex].push(card)

    this.cards = {
      ...this.cards,
      deck: deckCards,
      players: playerCards,
    }
    this.sortPlayerCards()
  }
  sortPlayerCards() {
    const isTrump = (card) => card.suit === this.trumpSuit
    const isEqualSuit = (card1, card2) => {
      if (!this.trumpSuit) return true
      if (isTrump(card1) && isTrump(card2)) return true
      if (!isTrump(card1) && !isTrump(card2)) return true
      return false
    }

    const playerCards = helpers.getDeepCopy(this.cards.players)
    for (const cards of playerCards) {
      cards.sort((a, b) => {
        if (isEqualSuit(a, b)) return a.value - b.value
        if (isTrump(a) && !isTrump(b)) return 1
        if (!isTrump(a) && isTrump(b)) return -1
        return 0
      })
    }

    this.cards = {
      ...this.cards,
      players: playerCards,
    }
  }
  clearGameProps() {
    this.defendSucceed = null
  }
  startTrick() {
    if (this.getNumberOfActivePlayers() < 2) this.endGame()
    else {
      this.updateActivePlayers()
      this.updateAttackerAndDefender()
      this.updateMaxAttacks()
      if (this.attacker === this.userIndex) this.sendPossibleCardsToUser()
      else {
        const decision = this.makeDecision(this.attacker)
        this.makeMove(this.attacker, decision)
        this.updateActivePlayerTimers()
      }
    }
  }
  getNumberOfActivePlayers() {
    return this.cards.players.filter((cards) => cards.length).length
  }
  updateActivePlayers() {
    const activePlayers = []
    for (const [playerIndex, cards] of this.cards.players.entries()) {
      if (cards.length) {
        const playerObject = { index: playerIndex }
        if (playerIndex === this.userIndex) playerObject.pass = false
        else {
          playerObject.timer = null
          playerObject.rejected = []
        }
        activePlayers.push(playerObject)
      }
    }
    const gameState = this
    this.activePlayers = {
      players: activePlayers,
      isPlayerInGame(index) {
        return !!this.players.filter((playerObject) => playerObject.index === index)[0]
      },
      getNextIndex(index) {
        const indexes = this.players.map((playerObject) => playerObject.index)
        let nextIndex
        for (const i of indexes) {
          if (i > index) {
            nextIndex = i
            break
          }
        }
        if (nextIndex === undefined) nextIndex = indexes[0]
        return nextIndex
      },
      playersDontHaveTimers() {
        const playersWithTimers = this.players.filter((playerObject) => playerObject.timer)
        return !playersWithTimers.length
      },
      userPass() {
        this.players = this.players.map((playerObject) =>
          playerObject.index === gameState.userIndex
            ? { ...playerObject, pass: true }
            : playerObject,
        )
      },
    }
  }
  updateAttackerAndDefender() {
    if (this.defendSucceed === null) this.defineAttackerAndDefenderByLowestTrump()
    else if (this.defendSucceed) {
      if (this.activePlayers.isPlayerInGame(this.defender)) {
        this.attacker = this.defender
      } else {
        this.attacker = this.activePlayers.getNextIndex(this.defender)
      }
    } else {
      this.attacker = this.activePlayers.getNextIndex(this.defender)
    }

    this.defender = this.activePlayers.getNextIndex(this.attacker)

    this.observable.update([
      { prop: 'attacker', value: this.attacker },
      { prop: 'defender', value: this.defender },
    ])
  }
  defineAttackerAndDefenderByLowestTrump() {
    const playerCards = this.cards.players
    const playersNumber = playerCards.length
    let minTrump = {
      playerIndex: null,
      value: 15,
    }
    for (const [index, cards] of playerCards.entries()) {
      for (const card of cards) {
        if (card.suit === this.trumpSuit && card.value < minTrump.value) {
          minTrump = {
            playerIndex: index,
            value: card.value,
          }
        }
      }
    }

    if (minTrump.playerIndex !== null) {
      this.attacker = minTrump.playerIndex
    } else {
      const randomIndex = Math.floor(Math.random() * playersNumber)
      this.attacker = randomIndex
    }
    this.defender = this.activePlayers.getNextIndex(this.attacker)
  }
  updateMaxAttacks() {
    this.maxAttacks = Math.min(this.cards.players[this.defender].length, config.maxAttacks)
  }
  sendPossibleCardsToUser(possibleCards) {
    if (!possibleCards) possibleCards = this.findPossibleCards(this.userIndex)
    this.observable.update([{ prop: 'possibleCards', value: possibleCards }])
  }
  findPossibleCards(playerIndex) {
    if (playerIndex === this.defender) return this.findCardsForDefend(playerIndex)
    else return this.findCardsForAttack(playerIndex)
  }
  findCardsForAttack(playerIndex) {
    const attacks = this.cards.table
    const playerCards = this.cards.players[playerIndex]
    if (attacks.length >= this.maxAttacks) return []
    if (!attacks.length) return playerCards.map((card) => card.id)

    const tableCards = []
    for (const attack of attacks) {
      tableCards.push(...attack)
    }
    const tableCardRanks = tableCards.map((card) => card.rank)
    return playerCards.filter((card) => tableCardRanks.includes(card.rank)).map((card) => card.id)
  }
  findCardsForDefend(playerIndex) {
    const playerCards = this.cards.players[playerIndex]
    const notBeatenAttacks = this.cards.table
      .map((attack, index) => ({ cards: attack, index }))
      .filter((attack) => {
        if (attack.cards.length === 1) return true
        return false
      })
    const possibleCards = []
    for (const attack of notBeatenAttacks) {
      const attackCard = attack.cards[0]
      playerCards
        .filter((card) => this.getHigherCard(card, attackCard).id === card.id)
        .forEach((card) => {
          if (!possibleCards.includes(card.id)) possibleCards.push(card.id)
        })
    }
    return possibleCards
  }
  makeDecision(playerIndex) {
    const possibleCards = this.findPossibleCards(playerIndex)
    if (possibleCards.length) {
      const isDefender = this.defender === playerIndex
      const isAttackRequired = !this.cards.table.length
      const cardsInDeck = !!this.cards.deck.length
      const unbeatenCards = this.cards.table.filter((attack) => attack.length === 1)
      const cardId = possibleCards[0]
      const card = this.getCardById(cardId)
      let pass = false

      if (!isDefender) {
        if (!isAttackRequired) {
          if (cardsInDeck && card.suit === this.trumpSuit) pass = true
        }
      } else {
        if (possibleCards.length < unbeatenCards.length) pass = true
        if (cardsInDeck && card.suit === this.trumpSuit && card.value > 10) pass = true
      }

      if (!pass) return cardId
      else return null
    }
  }
  makeMove(playerIndex, cardId) {
    const isDefender = playerIndex === this.defender
    const card = this.getCardById(cardId)

    const tableCards = this.addCardToTable(card, isDefender)

    const playerCards = this.cards.players.map((cards, index) => {
      if (index === playerIndex) {
        return cards.filter((playerCard) => playerCard.id !== cardId)
      } else return cards
    })

    this.cards = {
      ...this.cards,
      table: tableCards,
      players: playerCards,
    }
    this.observable.update([{ prop: 'cards', value: this.cards }])
  }
  addCardToTable(card, defendCard) {
    const tableCards = helpers.getDeepCopy(this.cards.table)
    if (defendCard) {
      let attackIndexes = []
      tableCards.forEach((attack, index) => {
        if (attack.length === 1 && this.getHigherCard(card, attack[0]).id === card.id) {
          attackIndexes.push(index)
        }
      })
      const randomIndex = Math.floor(Math.random() * attackIndexes.length)
      const attackIndex = attackIndexes[randomIndex]
      return tableCards.map((attack, index) => (index === attackIndex ? [...attack, card] : attack))
    }

    return [...this.cards.table, [card]]
  }
  getCardById(id) {
    for (const place in this.cards) {
      for (const elem of this.cards[place]) {
        if (elem instanceof Array) {
          for (const card of elem) {
            if (card.id === id) return card
          }
        } else {
          if (elem.id === id) return elem
        }
      }
    }
  }
  getHigherCard(a, b) {
    if (a.suit === b.suit) {
      if (a.value > b.value) return a
      else return b
    }
    if (a.suit === this.trumpSuit) return a
    return b
  }
  updateActivePlayerTimers() {
    const isUserInGame = this.activePlayers.isPlayerInGame(this.userIndex)
    let userHasNoPossibleCards = isUserInGame ? false : true
    for (const playerObject of this.activePlayers.players) {
      if (playerObject.index === this.userIndex) {
        if (playerObject.pass) userHasNoPossibleCards = true
        else {
          const possibleCards = this.findPossibleCards(playerObject.index)
          if (!possibleCards.length) userHasNoPossibleCards = true
          this.sendPossibleCardsToUser(possibleCards)
        }
      } else if (!playerObject.timer) {
        const possibleCards = this.findPossibleCards(playerObject.index).filter(
          (cardId) => !playerObject.rejected.includes(cardId),
        )

        if (possibleCards.length) {
          const randomTime = isUserInGame
            ? Math.random() * 2000 + 2000
            : Math.random() * 1500 + 1500

          playerObject.timer = setTimeout(() => {
            playerObject.timer = null
            const decision = this.makeDecision(playerObject.index)
            if (decision) this.makeMove(playerObject.index, decision)
            else playerObject.rejected.push(...possibleCards)

            this.updateActivePlayerTimers()
          }, randomTime)
        }
      }
    }
    if (this.activePlayers.playersDontHaveTimers() && userHasNoPossibleCards) {
      this.endTrick()
    }
  }
  endTrick() {
    this.defendSucceed = this.cards.table.reduce(
      (bool, attack) => (attack.length === 1 ? false : bool),
      true,
    )

    this.clearTable()
    this.drawCardsFromDeck()
  }
  clearTable() {
    const playerCards = helpers.getDeepCopy(this.cards.players[this.defender])
    const discardedCards = helpers.getDeepCopy(this.cards.discarded)
    for (const attack of this.cards.table) {
      for (const card of attack) {
        if (this.defendSucceed) discardedCards.push(card)
        else playerCards.push(card)
      }
    }
    this.cards = {
      ...this.cards,
      players: this.cards.players.map((cards, index) =>
        index === this.defender ? playerCards : cards,
      ),
      discarded: discardedCards,
      table: [],
    }
    this.sortPlayerCards()
    this.observable.update([{ prop: 'cards', value: this.cards }])
  }
  drawCardsFromDeck() {
    const playersNumber = this.cards.players.length
    let playersDrawnCards = 0
    let index = this.attacker
    const changePlayers = (index, newCards) =>
      this.cards.players.map((cards, i) => (index === i ? newCards : cards))

    while (playersDrawnCards < playersNumber) {
      const playerHasCards = this.cards.players[index].length
      if (playerHasCards < config.maxCardsAfterDealing) {
        const cardsNeeded = config.maxCardsAfterDealing - playerHasCards
        const playerCards = helpers.getDeepCopy(this.cards.players[index])
        const deckCards = helpers.getDeepCopy(this.cards.deck)

        for (let i = 0; i < cardsNeeded; i++) {
          if (deckCards.length) {
            const lastDeckCard = deckCards.pop()
            playerCards.push(lastDeckCard)
          }
        }

        this.cards = {
          ...this.cards,
          players: changePlayers(index, playerCards),
          deck: deckCards,
        }
      }

      this.sortPlayerCards()
      this.observable.update([{ prop: 'cards', value: this.cards }])
      playersDrawnCards++
      index = index - 1
      if (index === -1) index = playersNumber - 1
    }
  }
  endGame() {
    let loser = null
    for (const [playerIndex, cards] of this.cards.players.entries()) {
      if (cards.length) {
        loser = playerIndex
        break
      }
    }
    this.trumpSuit = null
    this.cards = {
      deck: [],
      players: [],
      table: [],
      discarded: [],
    }
    this.observable.update([
      { prop: 'isPlaying', value: false },
      { prop: 'trumpSuit', value: null },
      { prop: 'attacker', value: null },
      { prop: 'defender', value: null },
      { prop: 'loser', value: loser },
    ])
  }
  makeUserMove(cardId) {
    const possibleCards = this.findPossibleCards(this.userIndex)
    if (possibleCards.includes(cardId)) {
      this.makeMove(this.userIndex, cardId)
      this.updateActivePlayerTimers()
    }
  }
  pass() {
    this.activePlayers.userPass()
    this.observable.update([{ prop: 'possibleCards', value: [] }])
    this.updateActivePlayerTimers()
  }
}

export default GameState

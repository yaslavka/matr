import React from 'react'
import card from '../Components/pics/card.png'
import uno from '../Components/pics/1-heart.png'
import dos from '../Components/pics/2-trebol.png'
import tres from '../Components/pics/3-rombo.png'
import cuatro from '../Components/pics/4-picas.png'
import coins from '../Components/pics/background.jpg'
import tries from '../Components/pics/background2.jpg'
import crupier from '../Components/pics/crupier.jpg'
import trofy from '../Components/pics/trofy.png'
import sad from '../Components/pics/sad.png'
import './mainPage.css'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

class Game extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      availableMoney: 50,
      disabled: false,
      resetDisabled: true,
      tries: 0,
      wasWon: null,
      myName: 'Player',
    }
    this.instructions = this.instructions.bind(this)
    this.activatePlay = this.activatePlay.bind(this)
    this.reset = this.reset.bind(this)
    this.setState = this.setState.bind(this)
    this.winnerToast = this.winnerToast.bind(this)
    this.looserToast = this.looserToast.bind(this)
  }

  instructions = (e) => {
    e.preventDefault()
    document.getElementById('cheers').classList.remove('invisible')
    document.getElementById('cheers').classList.add('visible')
  }

  winnerToast = () => {
    const MySwalWinner = withReactContent(Swal)

    MySwalWinner.fire({
      title:
        '<strong>Fantastic! You won, ' +
        // eslint-disable-next-line react/prop-types
        this.props.myName +
        '!!!</strong><br>Your score was ' +
        this.state.availableMoney +
        ' coins in ' +
        this.state.tries +
        ' tries',
      imageUrl: trofy,
      html: 'Did you have fun playing in Caro_es_ca<em>sino</em>?',
      showCloseButton: true,
      showCancelButton: true,
      focusConfirm: false,
      confirmButtonText: '<i class="fa fa-thumbs-up"></i> Yes!',
      confirmButtonAriaLabel: 'Thumbs up, great!',
      cancelButtonText: '<i class="fa fa-thumbs-down"></i> No',
      cancelButtonAriaLabel: 'Thumbs down',
    })
  }

  looserToast = () => {
    const MySwalLosser = withReactContent(Swal)

    MySwalLosser.fire({
      title:
        "<strong>I'm sorry, " +
        // eslint-disable-next-line react/prop-types
        this.props.myName +
        '! You lost the game!!!</strong><br>Your score was just ' +
        this.state.availableMoney +
        ' coins in ' +
        this.state.tries +
        ' tries',
      imageUrl: sad,
      html: 'Did you have fun playing in Caro_es_ca<em>sino</em>?',
      showCloseButton: true,
      showCancelButton: true,
      focusConfirm: false,
      confirmButtonText: '<i class="fa fa-thumbs-up"></i> Yes!',
      confirmButtonAriaLabel: 'Thumbs up, great!',
      cancelButtonText: '<i class="fa fa-thumbs-down"></i> No',
      cancelButtonAriaLabel: 'Thumbs down',
    })
  }

  add20 = () => this.setState({ availableMoney: this.state.availableMoney + 20 })
  add30 = () => this.setState({ availableMoney: this.state.availableMoney + 30 })
  discount10 = () => this.setState({ availableMoney: this.state.availableMoney - 10 })

  activatePlay = (e) => {
    e.preventDefault()
    this.setState({ disabled: true })
    this.setState({ tries: this.state.tries + 1 })

    let cardsForPlay = [uno, dos, tres, cuatro]
    let a = cardsForPlay[Math.ceil(Math.random() * 4) - 1]
    let b = cardsForPlay[Math.ceil(Math.random() * 4) - 1]
    let c = cardsForPlay[Math.ceil(Math.random() * 4) - 1]

    document.getElementById('card1').classList.add('shake-constant')
    document.getElementById('card1').classList.add('shake-slow')
    document.getElementById('card2').classList.add('shake-constant')
    document.getElementById('card2').classList.add('shake-slow')
    document.getElementById('card3').classList.add('shake-constant')
    document.getElementById('card3').classList.add('shake-slow')

    setTimeout(() => {
      document.getElementById('card1').src = a
      document.getElementById('card1').classList.remove('shake-constant')
      document.getElementById('card1').classList.remove('shake-slow')
      document.getElementById('card1').classList.add('cardWithBorder')
    }, 2000)
    setTimeout(() => {
      document.getElementById('card2').src = b
      document.getElementById('card2').classList.remove('shake-constant')
      document.getElementById('card2').classList.remove('shake-slow')
      document.getElementById('card2').classList.add('cardWithBorder')
    }, 4000)
    setTimeout(() => {
      document.getElementById('card3').src = c
      document.getElementById('card3').classList.remove('shake-constant')
      document.getElementById('card3').classList.remove('shake-slow')
      document.getElementById('card3').classList.add('cardWithBorder')
    }, 6000)

    let winnerExpressions = [
      "Wowwww!! You're the bosss here!",
      "Amazing! You're the luckiest person in this Casino",
      "Excellent! Let's try again!",
      'Awesome, I want to marry you!',
    ]
    let almostWinnerExpressions = [
      'Pretty well! Try again!',
      'Ohhh, maybe next time',
      'The next is yours! Well done!',
      'Excellent! Keep  it up!',
    ]
    let losserExpressions = [
      "I'm sorry, you're bad in this",
      'Bad luck, mate',
      'That was lame',
      'Loooosseerrrr',
    ]

    //Lógica de desarrollo del juego
    setTimeout(() => {
      document.getElementById('expression').classList.remove('expression')
      document.getElementById('expression').classList.add('expressionAdded')
      this.setState({ resetDisabled: false })
      if (this.state.availableMoney >= 100) {
        this.setState({ wasWon: true })
      } else if (this.state.tries >= 5) {
        this.setState({ wasWon: false })
      } else if (
        /* 1 igual entre los tres */
        a === cardsForPlay[0] &&
        b === cardsForPlay[0] &&
        c === cardsForPlay[0]
      ) {
        document.getElementById('result').textContent =
          winnerExpressions[Math.ceil(Math.random() * 4) - 1]
        this.add30()
        /* 2 igual entre los tres */
      } else if (a === cardsForPlay[1] && b === cardsForPlay[1] && c === cardsForPlay[1]) {
        document.getElementById('result').textContent =
          winnerExpressions[Math.ceil(Math.random() * 4) - 1]
        this.add30()
        /* 3 igual entre los tres */
      } else if (a === cardsForPlay[2] && b === cardsForPlay[2] && c === cardsForPlay[2]) {
        document.getElementById('result').textContent =
          winnerExpressions[Math.ceil(Math.random() * 4) - 1]
        this.add30()
        /* 4 igual entre los tres */
      } else if (
        a === cardsForPlay[3] &&
        b === cardsForPlay[3] &&
        document.getElementById('card3').src === cardsForPlay[3]
      ) {
        document.getElementById('result').textContent =
          winnerExpressions[Math.ceil(Math.random() * 4) - 1]
        this.add30()
        /* uno y dos con 1-heart. */
      } else if (
        a === cardsForPlay[0] &&
        b === cardsForPlay[0] &&
        document.getElementById('card3').src !== cardsForPlay[0]
      ) {
        document.getElementById('result').textContent =
          almostWinnerExpressions[Math.ceil(Math.random() * 4) - 1]
        this.add20()
        /*  dos y tres con 1-heart. */
      } else if (a !== cardsForPlay[0] && b === cardsForPlay[0] && c === cardsForPlay[0]) {
        document.getElementById('result').textContent =
          almostWinnerExpressions[Math.ceil(Math.random() * 4) - 1]
        this.add20()
        /*  uno y tres con 1-heart. */
      } else if (a === cardsForPlay[0] && b !== cardsForPlay[0] && c === cardsForPlay[0]) {
        document.getElementById('result').textContent =
          almostWinnerExpressions[Math.ceil(Math.random() * 4) - 1]
        this.add20()
        /*  uno y dos con 2-trebol*/
      } else if (a === cardsForPlay[1] && b === cardsForPlay[1] && c !== cardsForPlay[1]) {
        document.getElementById('result').textContent =
          almostWinnerExpressions[Math.ceil(Math.random() * 4) - 1]
        this.add20()
        /*  dos y tres con 2-trebol*/
      } else if (a !== cardsForPlay[1] && b === cardsForPlay[1] && c === cardsForPlay[1]) {
        document.getElementById('result').textContent =
          almostWinnerExpressions[Math.ceil(Math.random() * 4) - 1]
        this.add20()
        /*  uno y tres con 2-trebol*/
      } else if (a === cardsForPlay[1] && b !== cardsForPlay[1] && c === cardsForPlay[1]) {
        document.getElementById('result').textContent =
          almostWinnerExpressions[Math.ceil(Math.random() * 4) - 1]
        this.add20()
        /* uno y dos con 3-rombo*/
      } else if (a === cardsForPlay[2] && b === cardsForPlay[2] && c !== cardsForPlay[2]) {
        document.getElementById('result').textContent =
          almostWinnerExpressions[Math.ceil(Math.random() * 4) - 1]
        this.add20()
        /* uno y tres con 3-rombo*/
      } else if (a === cardsForPlay[2] && b !== cardsForPlay[2] && c === cardsForPlay[2]) {
        document.getElementById('result').textContent =
          almostWinnerExpressions[Math.ceil(Math.random() * 4) - 1]
        this.add20()
        /* dos y tres con 3-rombo*/
      } else if (a !== cardsForPlay[2] && b === cardsForPlay[2] && c === cardsForPlay[2]) {
        document.getElementById('result').textContent =
          almostWinnerExpressions[Math.ceil(Math.random() * 4) - 1]
        this.add20()
        /* uno y dos con 4-picas*/
      } else if (a === cardsForPlay[3] && b === cardsForPlay[3] && c !== cardsForPlay[3]) {
        document.getElementById('result').textContent =
          almostWinnerExpressions[Math.ceil(Math.random() * 4) - 1]
        this.add20()
        /* uno y tres con 4-picas*/
      } else if (a === cardsForPlay[3] && b !== cardsForPlay[3] && c === cardsForPlay[3]) {
        document.getElementById('result').textContent =
          almostWinnerExpressions[Math.ceil(Math.random() * 4) - 1]
        this.add20()
        /* dos y tres con 4-picas*/
      } else if (a !== cardsForPlay[3] && b === cardsForPlay[3] && c === cardsForPlay[3]) {
        document.getElementById('result').textContent =
          almostWinnerExpressions[Math.ceil(Math.random() * 4) - 1]
        this.add20()
      } else {
        document.getElementById('result').textContent =
          losserExpressions[Math.ceil(Math.random() * 4) - 1]
        this.discount10()
      }
    }, 6500)
  }

  reset = (e) => {
    e.preventDefault()
    this.setState({ disabled: false })
    this.setState({ resetDisabled: true })
    document.getElementById('card1').src = [card]
    document.getElementById('card2').src = [card]
    document.getElementById('card3').src = [card]
    document.getElementById('card1').classList.remove('cardWithBorder')
    document.getElementById('card2').classList.remove('cardWithBorder')
    document.getElementById('card3').classList.remove('cardWithBorder')
    document.getElementById('result').textContent = '... ...'
  }

  totalreset = () => {
    this.setState({
      availableMoney: 50,
      disabled: false,
      resetDisabled: true,
      tries: 0,
      wasWon: null,
      myName: '',
    })
    document.getElementById('card1').src = [card]
    document.getElementById('card2').src = [card]
    document.getElementById('card3').src = [card]
    document.getElementById('card1').classList.remove('cardWithBorder')
    document.getElementById('card2').classList.remove('cardWithBorder')
    document.getElementById('card3').classList.remove('cardWithBorder')
    document.getElementById('result').textContent = '... ...'
  }

  render() {
    let name = ''
    // eslint-disable-next-line react/prop-types
    if (this.props.logged === true) {
      // eslint-disable-next-line react/prop-types
      name = this.props.myName
    } else {
      name = 'Player'
    }

    if (this.state.wasWon === false) {
      this.looserToast(name)
      this.totalreset()
    }
    if (this.state.wasWon === true) {
      this.winnerToast(name)
      this.totalreset()
    }

    return (
      <div>
        <div id="registration">
          <br />
          <form>
            <div className="mb-3">
              <label htmlFor="InputUserName" className="form-label">
                User Name{' '}
              </label>
              <input
                type="text"
                className="form-control"
                id="InputUserName"
                placeholder="Tell me your name (optional)"
                /* eslint-disable-next-line react/prop-types */
                value={this.props.myName}
                /* eslint-disable-next-line react/prop-types */
                onChange={this.props.logging}
              />
            </div>
            <button type="submit" className="btn btn-success" onClick={this.instructions}>
              Instructions
            </button>
            <br />
          </form>
        </div>
        <br />
        <div id="cheers" className="alert alert-success invisible" role="alert">
          <h3 className="alert-heading" id="firstHello">
            Hello {name}!!!
          </h3>
          <br />
          <p>
            You are given 50 coins to play.
            <br />
            For each intent you loose 10 coins.
            <br />
            If you match two out of three cards, you win 20 coins.
            <br />
            If you match three out of three, you win 30 coins.
            <br />
            You have only 5 tries to earn more than 100 coins and become a champion!.
          </p>
          <hr />
          <p className="mb-0">
            Caro_es_ca<span className="resalts">sino</span> wishes you luck!!.
          </p>
        </div>

        <hr />
        <h2>Lets play!</h2>
        <br />

        <div id="explainCoinTries">
          <div className="cards bg-dark text-white expression" id="expression">
            <img src={crupier} className="card-img" alt="..." />
            <div id="result"></div>
          </div>

          <div id="coins" className="cards">
            <img src={coins} className="card-img-top" alt="..." />
            <div className="card-body">
              <h5 className="card-title">Coins:</h5>
              <p className="card-text">{this.state.availableMoney}</p>
            </div>
          </div>

          <div id="tries" className="cards">
            <img src={tries} className="card-img-top" alt="..." />
            <div className="card-body">
              <h5 className="card-title">Tries:</h5>
              <p className="card-text">{this.state.tries}</p>
            </div>
          </div>
        </div>
        <br />
        <button
          className="btn btn-light"
          onClick={this.activatePlay}
          disabled={this.state.disabled}
        >
          Pull the handle
        </button>
        <button className="btn btn-dark" onClick={this.reset} disabled={this.state.resetDisabled}>
          Reset
        </button>
        <br />

        <div className="cardss">
          <img className="cards" id="card1" src={card} alt={'card'} />
          <img className="cards" id="card2" src={card} alt={'card'} />
          <img className="cards" id="card3" src={card} alt={'card'} />
        </div>
        <hr />
      </div>
    )
  }
}

export default Game

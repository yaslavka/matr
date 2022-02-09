import React from 'react'
import Game from './Game.jsx'
import Footer from './Footer'

import './mainPage.css'

class MainPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      myName: '',
      logged: false,
    }
    this.logging = this.logging.bind(this)
  }

  logging = (e) => {
    e.preventDefault()
    this.setState({ myName: e.target.value })
    this.setState({ logged: true })
  }

  render() {
    return (
      <div className="containers">
        <Game />
        <Footer />
      </div>
    )
  }
}

export default MainPage

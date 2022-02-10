import React from 'react'
import { Route, BrowserRouter, NavLink, Link } from 'react-router-dom'
import StatusDisplay from './components/StatusDisplay'
import CoinToss from './components/CoinToss'
import WishingWell from './components/WishingWell'
import Blackjack from './components/Blackjack'

function Blak() {
  return (
    <BrowserRouter>
      <div className="App">
        <header>
          <div className="column">
            <div id="header-barx">
              <h1>Casin</h1>
              <StatusDisplay />
            </div>
            <nav>
              <NavLink to="/cointoss" className="nav-linkx" activeClassName="nav-link-activex">
                M&uuml;nzwurf
              </NavLink>
              <NavLink to="/blackjack" className="nav-linkx" activeClassName="nav-link-activex">
                Blackjack
              </NavLink>
              <NavLink to="/wishingwell" className="nav-linkx" activeClassName="nav-link-activex">
                Wunschbrunnen
              </NavLink>
            </nav>
          </div>
        </header>
        <main className="column">
          <Route path="/cointoss" exact component={CoinToss} />
          <Route path="/blackjack" exact component={Blackjack} />
          <Route path="/wishingwell" exact component={WishingWell} />
        </main>
      </div>
    </BrowserRouter>
  )
}

export default Blak

/**
 * Slot Spinner - Game
 *
 * @category   Application_Frontend
 * @package    slot-spinner
 * @author     Suman Barua
 * @developer  Suman Barua <sumanbarua576@gmail.com>
 **/

import React, { Component } from 'react'
import Spinner from './components/Spinner/Spinner'
import Footer from './components/Layout/Footer'
import './App.css'

class Apps extends Component {
  state = {}
  render() {
    return (
      <div>
        <div>
          <Spinner />
          <Footer />
        </div>
      </div>
    )
  }
}

export default Apps

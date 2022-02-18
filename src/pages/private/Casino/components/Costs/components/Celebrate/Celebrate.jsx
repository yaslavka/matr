/**
 * Slot Spinner - Game
 *
 * @category   Application_Frontend
 * @package    slot-spinner
 * @author     Suman Barua
 * @developer  Suman Barua <sumanbarua576@gmail.com>
 **/

import React, { Component } from 'react'
import Fireworks from './Fireworks'
import $ from 'jquery'

class Celebrate extends Component {
  state = {
    canvas: '',
  }

  componentDidMount = () => {
    // load fireworks
    Fireworks.loopFireworks()

    // set state with fireworks canvas
    this.setState({ canvas: Fireworks.canvas })
  }

  // render fireworks
  render() {
    // get props and state data
    const canvas = this.state.canvas
    // eslint-disable-next-line react/prop-types
    const winnerActive = this.props.winnerActive

    // initially clear canvas holder
    $('#canvas-holder').empty()

    // check if there is any winner or not?
    if ($('#canvas-holder') && winnerActive == 1) {
      $('#canvas-holder').html(canvas)
    }

    // return fireworks contents
    return <div id="canvas-holder"></div>
  }
}

export default Celebrate

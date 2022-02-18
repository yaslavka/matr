import React from 'react'
import PropTypes from 'prop-types'

import Wheel from '../components/Wheel'

import one from '../assets/img/one.PNG'
import two from '../assets/img/two.PNG'
import three from '../assets/img/three.PNG'
import four from '../assets/img/four.PNG'
import five from '../assets/img/five.PNG'
import six from '../assets/img/six.PNG'
import seven from '../assets/img/seven.PNG'

class Spinner extends React.Component {
  static propTypes = {
    spin: PropTypes.bool.isRequired,
    onStop: PropTypes.func.isRequired,
  }

  state = {
    spinning: false,
    wheels: [],
  }

  images = [one, two, three, four, five, six, seven]

  componentDidMount() {
    this.setState({
      wheels: [this.randomImage(), this.randomImage(), this.randomImage()],
    })
  }

  static getDerivedStateFromProps(props, state) {
    return { spinning: props.spin }
  }

  componentDidUpdate(prevProps, prevState) {
    const { spinning } = this.state

    if (spinning && spinning !== prevState.spinning) {
      this.tick()
    }

    if (!spinning && spinning !== prevState.spinning) {
      clearInterval(this.isSpinning)
      this.props.onStop(this.state.wheels)
    }
  }

  randomImage = () => this.images[Math.floor(Math.random() * this.images.length)]

  spin = () =>
    this.setState({
      wheels: [this.randomImage(), this.randomImage(), this.randomImage()],
    })

  tick = () => (this.isSpinning = setInterval(this.spin, 50))

  render() {
    const { wheels } = this.state

    return (
      <React.Fragment>
        {wheels.map((wheel, id) => (
          <Wheel key={`${id}_${wheel}`} image={wheel} />
        ))}
      </React.Fragment>
    )
  }
}

export default Spinner

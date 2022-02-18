import React, { Component } from 'react'
import AppContext from '../context/AppContext'
import gameConfig from '../lib/gameConfig'

class Card extends Component {
  constructor(props) {
    super(props)
    this.imageElement = React.createRef()
  }

  render() {
    // eslint-disable-next-line react/prop-types
    const { id, rotation, coords, side, activePlayer } = this.props
    const {
      possibleCards,
      makeMove,
      cardStyles,
      updateCardStyles,
      movedCard,
      addMovedCard,
      removeMovedCard,
    } = this.context
    const { imageElement } = this
    const { cardSize } = gameConfig

    // eslint-disable-next-line react/prop-types
    const x = coords.x - cardSize.width / 2
    // eslint-disable-next-line react/prop-types
    let y = coords.y - cardSize.height / 2
    if (activePlayer && movedCard === id) y -= 20
    const translate = `translate(${x}px, ${y}px)`
    const rotate = `rotate(${rotation ? rotation + 'deg' : '0deg'})`
    const cardStyle = cardStyles ? cardStyles[id] : null
    const newStyle = {
      // eslint-disable-next-line react/prop-types
      transformOrigin: `${coords.x}px ${coords.y}px`,
      transform: `${rotate} ${translate}`,
    }

    const darker = activePlayer && !possibleCards.includes(id)

    const applyStyle = (elem, style, transition) => {
      elem.style.transform = style.transform
      elem.style.transformOrigin = style.transformOrigin
      elem.style.transition = transition ? '0.3s' : '0s'
      elem.style.cursor = activePlayer && !darker ? 'pointer' : 'auto'
      elem.style.filter = darker ? 'url("#darker")' : 'none'
    }

    ;(function changeStyles() {
      window.requestAnimationFrame(() => {
        const elem = imageElement.current
        if (!elem) changeStyles()
        else {
          if (cardStyle) {
            applyStyle(elem, cardStyle, false)
            window.requestAnimationFrame(() => {
              applyStyle(elem, newStyle, true)
              updateCardStyles(id, newStyle)
            })
          } else {
            applyStyle(elem, newStyle, false)
            updateCardStyles(id, newStyle)
          }
        }
      })
    })()

    const moveCardUp = () => {
      if (!movedCard && activePlayer && !darker) addMovedCard(id)
    }

    const moveCardDown = () => {
      if (movedCard === id) removeMovedCard()
    }

    const onClick = () => {
      if (activePlayer && !darker) {
        makeMove(id)
        if (movedCard === id) setTimeout(removeMovedCard, 300)
      }
    }

    return (
      <image
        ref={this.imageElement}
        x={0}
        y={0}
        width={cardSize.width}
        height={cardSize.height}
        href={side === 'front' ? `/images/cards/${id}.png` : `/images/cards/back.png`}
        id={id}
        className="card"
        onClick={onClick}
        onMouseOver={moveCardUp}
        onMouseLeave={moveCardDown}
      />
    )
  }
}

Card.contextType = AppContext

export default Card

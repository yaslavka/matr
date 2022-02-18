import React from 'react'
import WhiteCheckersPiece from '../../images/white-checkers-piece.png'
import BrownCheckersPiece from '../../images/brown-checkers-piece.png'
export default function Square(props) {
  return (
    // eslint-disable-next-line react/prop-types
    <button className={props.className} onClick={props.onClick}>
      <img
        src={
          // eslint-disable-next-line react/prop-types
          (props.value === 'w' && WhiteCheckersPiece) ||
          // eslint-disable-next-line react/prop-types
          (props.value === 'b' && BrownCheckersPiece) ||
          ''
        }
      />
    </button>
  )
}

import React from 'react'
import '../stylesheets/Table.css'

// eslint-disable-next-line react/prop-types
const Table = ({ field }) => {
  const style = {
    // eslint-disable-next-line react/prop-types
    cx: field.width / 2 + 'px',
    // eslint-disable-next-line react/prop-types
    cy: field.height / 2 + 'px',
    // eslint-disable-next-line react/prop-types
    r: (field.width - field.playerSpace * 2) / 2 + 'px',
  }
  return <circle className="tabless" style={style} />
}

export default Table

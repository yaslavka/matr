import React from 'react'

import { connect } from 'react-redux'
import { mapStateToProps, mapDispatchToProps } from '../reducer'
export default connect(mapStateToProps, mapDispatchToProps)(StatusDisplay)

function StatusDisplay(props) {
  return (
    <div
      id="status-display"
      /* eslint-disable-next-line react/prop-types */
      className={'glamour-text ' + (props.chips <= 0 ? 'red-text' : 'gold-text')}
    >
      {/* eslint-disable-next-line react/prop-types */}
      <span className="chips">{props.chips}</span> Chips
    </div>
  )
}

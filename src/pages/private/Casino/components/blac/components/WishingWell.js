import React, { Component } from 'react'

import { connect } from 'react-redux'
import { mapStateToProps, mapDispatchToProps } from '../reducer'

class WishingWell extends Component {
  throwChipInWell = () => {
    // eslint-disable-next-line react/prop-types
    this.props.adjustChips(-1)
    // eslint-disable-next-line react/prop-types
    this.props.adjustChipsInWishingWell(1)
  }

  retrieveAllChipsFromWell = () => {
    // eslint-disable-next-line react/prop-types
    this.props.adjustChips(this.props.chipsInWishingWell)
    // eslint-disable-next-line react/prop-types
    this.props.adjustChipsInWishingWell(-1 * this.props.chipsInWishingWell)
  }

  getWellStatusString = () => {
    // eslint-disable-next-line react/prop-types
    switch (this.props.chipsInWishingWell) {
      case 0:
        return 'Der Brunnen ist leer.'
      case 1:
        return 'Es  liegt ein Chip im Brunnen.'
      default:
        // eslint-disable-next-line react/prop-types
        return 'Es liegen ' + this.props.chipsInWishingWell + ' Chips im Brunnen.'
    }
  }

  render() {
    return (
      <div>
        <h2>Wünschbrunnen</h2>
        {/* eslint-disable-next-line react/prop-types */}
        {this.props.chips > 0 ? (
          <label>
            <p>Werfe einen Chip in den Brunnen und wünsch dir was!</p>
            {/* eslint-disable-next-line react/prop-types */}
            <button disabled={this.props.chips < 1} onClick={() => this.throwChipInWell()}>
              Auf gut Glück
            </button>
          </label>
        ) : (
          <label>
            <p>Du hast keine Chips mehr. Kein Glück heute, hm?</p>
            <button
              /* eslint-disable-next-line react/prop-types */
              disabled={this.props.chipsInWishingWell < 1}
              onClick={() => this.retrieveAllChipsFromWell()}
            >
              {/* eslint-disable-next-line react/prop-types */}
              {this.props.chipsInWishingWell > 1
                ? 'Fische die Chips aus dem Brunnen.'
                : 'Verdammt.'}
            </button>
          </label>
        )}
        <div>{this.getWellStatusString()}</div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(WishingWell)

/**
 * Slot Spinner - Game
 *
 * @category   Application_Frontend
 * @package    slot-spinner
 * @author     Suman Barua
 * @developer  Suman Barua <sumanbarua576@gmail.com>
 **/

import React from 'react'

// eslint-disable-next-line react/prop-types
const Loading = ({ contentLoading }) => {
  // check if content loading?
  if (!contentLoading) return null

  // return loading image
  return (
    <div className="fa-5x">
      <i className="fa fa-cog fa-spin"></i>
    </div>
  )
}

export default Loading

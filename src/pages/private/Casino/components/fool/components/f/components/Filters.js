import React from 'react'

const Filters = () => {
  return (
    <defs>
      <filter id="darker">
        <feColorMatrix
          type="matrix"
          values=".6   0   0   0   0
                  0  .6   0   0   0
                  0   0  .6   0   0
                  0   0   0   1   0 "
        />
      </filter>
    </defs>
  )
}

export default Filters

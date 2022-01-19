import React from 'react'
import styles from './Button.module.scss'
import PropTypes from 'prop-types'

function Button({ children, size, color, className = '', ...props }) {
  return (
    <button className={`${styles.Button} ${styles[size]} ${styles[color]} ${className}`} {...props}>
      {children}
    </button>
  )
}
Button.propTypes = {
  className: PropTypes.string.isRequired,
  children: PropTypes.string,
  size: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
}
export default Button

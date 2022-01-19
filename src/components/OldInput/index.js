import React from 'react'
import styles from './Input.module.scss'
import PropTypes from 'prop-types'

function Input({ className, field, form, ...props }) {
  const isInvalid = form && form.errors && form.touched[field.name] && form.errors[field.name]

  return (
    <div className={`${styles.Input} ${isInvalid ? styles.invalid : ''} ${className}`}>
      <input {...field} {...props} />
      {props.placeholder && <span className={styles.placeholder}>{props.placeholder}</span>}
      {isInvalid && <p className={styles.errorMessage}>{isInvalid}</p>}
    </div>
  )
}
Input.propTypes = {
  className: PropTypes.string.isRequired,
  externalClass: PropTypes.string,
  field: PropTypes.string.isRequired,
  form: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
}
export default Input

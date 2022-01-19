import React from 'react'
import { FormText } from 'reactstrap'
import styles from './Input.module.scss'
import PropTypes from 'prop-types'

function InputMultiline({ className, field, form, ...props }) {
  const isInvalid = form && form.errors && form.touched[field.name] && form.errors[field.name]

  return (
    <div className={`${styles.Input} ${isInvalid ? styles.invalid : ''} ${className}`}>
      <textarea {...field} {...props} />
      {/* eslint-disable-next-line react/prop-types */}
      {props.placeholder && (
        // eslint-disable-next-line react/prop-types
        <span className={styles.placeholder}>{props.placeholder}</span>
      )}
      {isInvalid && <FormText color="danger">{isInvalid}</FormText>}
    </div>
  )
}
InputMultiline.propTypes = {
  className: PropTypes.string.isRequired,
  externalClass: PropTypes.string,
  field: PropTypes.string.isRequired,
  form: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
}

export default InputMultiline

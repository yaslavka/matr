import React from 'react'
import { FormText } from 'reactstrap'
import InputMask from 'react-input-mask'

import styles from './Input.module.scss'
import PropTypes from 'prop-types'

function InputPhone({ className, field, form, ...props }) {
  const isInvalid = form && form.errors && form.touched[field.name] && form.errors[field.name]

  return (
    <div className={`${styles.Input} ${isInvalid ? styles.invalid : ''} ${className}`}>
      <InputMask
        {...field}
        type="tel"
        mask="+ 9999999999999"
        maskChar=""
        onChange={(e) => {
          const val = e.target.value.replace(/\D/g, '')
          form.setFieldValue('phone', val)
        }}
      />
      {props.placeholder && <span className={styles.placeholder}>{props.placeholder}</span>}
      {isInvalid && <FormText color="danger">{isInvalid}</FormText>}
    </div>
  )
}
InputPhone.propTypes = {
  className: PropTypes.string.isRequired,
  externalClass: PropTypes.string,
  field: PropTypes.string.isRequired,
  form: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
}

export default InputPhone

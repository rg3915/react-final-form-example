import React from 'react'
import { Field } from 'react-final-form'

const SelectInputComponent = props => {

  const { id, label, input, children, ...rest } = props

  const inputProps = {
    id,
    ...input,
    ...rest
  }

  return (
    <div>
      { label ? <label htmlFor={id}>{label}</label> : null }
      <select {...inputProps} >
        {children}
      </select>
    </div>
  )
}

const SelectInput = props => {
  return <Field component={SelectInputComponent} {...props} />
}

export default SelectInput
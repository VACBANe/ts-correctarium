import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import './Input.css'
interface Props {
  legendText: string;
  value: string;
  valueName: string;
  isRequired?: boolean;
  onChangeField: (field: string, value: string) => any;
}
const Input: React.FC<Props> = ({
  legendText,
  isRequired = false,
  onChangeField,
  valueName,
  value
}) => {
  const dispatch = useDispatch()
  const [isFocused, setFocuse] = useState<boolean>(false)
  return (
    <fieldset
      className={
        isFocused ? 'field-input-container focused' : 'field-input-container'
      }
    >
      <legend className="field-legend">{value && legendText}</legend>
      <input
        onFocus={() => setFocuse(true)}
        onBlur={() => setFocuse(false)}
        required={isRequired}
        type="text"
        placeholder={legendText}
        onChange={(e) => dispatch(onChangeField(valueName, e.target.value))}
        className={value ? '' : 'input-placeholder'}
      />
    </fieldset>
  )
}

export default Input

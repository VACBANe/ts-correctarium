import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import './Input.css'
interface Props {
  text: string;
  value: string;
  valueName: string;
  isRequired?: boolean;
  onChangeField: (field: string, value: string) => any;
}
const Input: React.FC<Props> = ({
  text,
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
      <legend className="field-legend">{value && text}</legend>
      <input
        onFocus={() => setFocuse(true)}
        onBlur={() => setFocuse(false)}
        required={isRequired}
        type="text"
        placeholder={text}
        onChange={(e) => dispatch(onChangeField(valueName, e.target.value))}
        className={value ? '' : 'input-placeholder'}
      />
    </fieldset>
  )
}

export default Input

import React, { useState } from "react";
import "./Input.css";
interface Props {
  text: string;
  value: string;
  onChange: React.Dispatch<React.SetStateAction<string>>;
  isRequired?: boolean;
}
const Input: React.FC<Props> = ({
  text,
  value,
  onChange,
  isRequired = false,
}) => {
  const [isFocused, setFocuse] = useState<boolean>(false);
  return (
    <fieldset
      className={
        isFocused ? "field-input-container focused" : "field-input-container"
      }
    >
      <legend className="field-legend">{value && text}</legend>
      <input
        onFocus={() => setFocuse(true)}
        onBlur={() => setFocuse(false)}
        required={isRequired}
        type="text"
        placeholder={text}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={value ? "" : "input-placeholder"}
      />
    </fieldset>
  );
};

export default Input;

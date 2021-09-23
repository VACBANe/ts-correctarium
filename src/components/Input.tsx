import React from "react";
import "./Input.css";
interface Props {
  text: string;
  value: string;
  onChange: React.Dispatch<React.SetStateAction<string>>;
  isRequired?: boolean;
}
const Input:React.FC<Props> = ({text, value, onChange, isRequired}) => {
  return (
    <fieldset className="field-container">
      <legend className="field-legend">{value && text}</legend>
      <input
        type="text"
        placeholder={text}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </fieldset>
  );
};

export default Input;

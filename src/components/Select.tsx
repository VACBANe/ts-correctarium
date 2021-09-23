import React, { useEffect, useState } from "react";
import './Select.css';
type arrElements = {
  value: string;
  text: string;
};
interface SelectProps {
  options: arrElements[];
  stateFunc: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  value: any;
}
const Select: React.FC<SelectProps> = ({ options, value, stateFunc }) => {
  const [isOpened, setIsOpened] = useState<boolean>(false);
  const closeSelect = () => {
    console.log('clicked')
    if(isOpened) {
      setIsOpened(false);
    }
  }
  useEffect(() => {
    document.addEventListener('click', closeSelect, true);
    return () => {
      document.removeEventListener('click', closeSelect, true);
    }
  }, [])
  return (
    <div>
      <fieldset className="field-container">
        <legend className="field-legend">{value}</legend>
        <label onClick={() => setIsOpened(true)}>{value}</label>
        {isOpened && <div>{options.map((item) => (
          <label>{item.text}</label>
        ))}</div>}
      </fieldset>
      <select value={value} onChange={stateFunc}>
        {options.map((item) => (
          <option key={item.value} value={item.value}>
            {item.text}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
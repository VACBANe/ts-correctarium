import React from 'react';

type arrElements = {
  value: string,
  text: string
}
interface Props {
  options: arrElements[],
  stateFunc: (e: React.ChangeEvent<HTMLSelectElement>) => void,
  value: any
}

const NewSelect:React.FC<Props> = ({options, value, stateFunc}) => {
  return (
    <fieldset className="field-container">
      <legend className="field-legend">{value}</legend>
      <label>{value}</label>
      <input/>
    </fieldset>
  );
};

export default NewSelect;
import React from "react";
type arrElements = {
    value: string,
    text: string
}
interface SelectProps {
    options: arrElements[],
    stateFunc?: React.Dispatch<React.SetStateAction<string>>,
    value?: string
}

const Select: React.FC<SelectProps> = ({options, value, stateFunc}) => {
    return (
        <div>
            <select value={value} onChange={stateFunc && (e => stateFunc(e.target.value))}>
                {options.map((item) => <option key={item.value} value={item.value}>{item.text}</option>)}
            </select>
        </div> 
    );
}

export default Select;
import React from "react";
type arrElements = {
    value: string,
    text: string
}
interface SelectProps {
    options: arrElements[],
    stateFunc: (e: React.ChangeEvent<HTMLSelectElement>) => void,
    value: any
}

const Select: React.FC<SelectProps> = ({options, value, stateFunc}) => {
    return (
        <div>
            <select value={value} onChange={stateFunc}>
                {options.map((item) => <option key={item.value} value={item.value}>{item.text}</option>)}
            </select>
        </div> 
    );
}

export default Select;
type arrElements = {
    value: string,
    text: string
}
type SelectProps = {
    options: arrElements[],
    stateFunc: (e: React.ChangeEvent<HTMLSelectElement>) => void,
    value: any
}

const Select = ({options, value, stateFunc}: SelectProps) => {
    return (
        <div>
            <select value={value} onChange={stateFunc}>
                {options.map((item) => <option key={item.value} value={item.value}>{item.text}</option>)}
            </select>
        </div> 
    );
}

export default Select;
import React, { RefObject, useEffect, useRef, useState } from "react";
import "./Select.css";
import arrow from "../assets/arrow_down.svg";
type arrElements = {
  value: string;
  text: string;
};
interface SelectProps {
  options: arrElements[];
  stateFunc: React.Dispatch<React.SetStateAction<string>>;
  value?: string;
  legendText: string;
}

const useOnClickOutside = (
  ref: RefObject<HTMLDivElement>,
  closeMenu: () => void
) => {
  useEffect(() => {
    const listener = (event: MouseEvent) => {
      if (
        ref.current &&
        event.target &&
        ref.current.contains(event.target as Node)
      ) {
        return;
      }
      closeMenu();
    };

    document.addEventListener("mousedown", listener);
    return () => {
      document.removeEventListener("mousedown", listener);
    };
  }, [ref, closeMenu]);
};
const Select: React.FC<SelectProps> = ({ options, value, stateFunc, legendText }) => {
  const [isOpened, setIsOpened] = useState<boolean>(false);
  const node = useRef<HTMLDivElement>(null);
  const [selectedText, setSelectedText] = useState<string>("");
  useOnClickOutside(node, () => setIsOpened(false));
  return (
    <div>
      <fieldset
        className={isOpened ? "field-container opened" : "field-container"}
        onClick={() => setIsOpened(true)}
      >
        <legend className="select-legend">{value ? legendText : ""}</legend>
        <div>
        <label className={value ? "field-label" : "field-label placeholder"}>{value ? selectedText : legendText}</label>
        <img className={isOpened ? "arrow arrow-up" : "arrow"} src={arrow} alt={"arrow"}/>
        </div>
      </fieldset>
      {isOpened && (
        <div ref={node} className="select-list">
          {options.map((item) => (
            <label
              className="select-item"
              onClick={() => {
                stateFunc(item.value);
                setIsOpened(false);
                setSelectedText(item.text);
              }}
            >
              {item.text}
            </label>
          ))}
        </div>
      )}
    </div>
  );
};

export default Select;

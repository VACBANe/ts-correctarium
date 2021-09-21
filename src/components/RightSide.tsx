import React from "react";
import "../style.css";

interface Props {
  time: string;
  sum: string;
  isDisabled: boolean;
}

const RightSide: React.FC<Props> = ({ sum, time, isDisabled }) => {
  return (
    <div className="rightside">
      <div className="close_button" onClick={() => alert("Закрыто")}></div>
      <div>
        <div className={"sum"}>
          {sum} <span className="smallPrice">грн</span>
        </div>
      </div>
      {time}
      <button disabled={isDisabled}>Замовити</button>
    </div>
  );
};

export default RightSide;

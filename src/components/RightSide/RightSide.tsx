import React from 'react'
import './RightSide.css'

interface Props {
  time: string;
  sum: string;
  isDisabled: boolean;
}

const RightSide: React.FC<Props> = ({ sum, time, isDisabled }) => {
  return (
    <div className="rightside">
      <div className="close_button" onClick={() => alert('Вийти')}></div>
      <div className={'sum'}>
        {sum} <span className="smallPrice">грн</span>
      </div>
      <div className="time">{time}</div>
      <button disabled={isDisabled} className={'order-button'}>
        Замовити
      </button>
    </div>
  )
}

export default RightSide

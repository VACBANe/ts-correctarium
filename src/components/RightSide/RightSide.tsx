import React from 'react'
import './RightSide.css'

interface Props {
  time: string;
  price: string;
  isDisabled: boolean;
}

const RightSide: React.FC<Props> = ({ price, time, isDisabled }) => {
  return (
    <div className="rightside">
      <div className="close_button" onClick={() => alert('Вийти')}></div>
      <div className={'price'}>
        {price} <span className="smallPrice">грн</span>
      </div>
      <div className="time">{time}</div>
      <button disabled={isDisabled} className={'order-button'}>
        Замовити
      </button>
    </div>
  )
}

export default RightSide

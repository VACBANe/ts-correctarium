import { Dispatch } from 'redux'
import {
  onChangeField,
  enableButton,
  disableButton
} from '../store/actionCreator'
import { getDeadline } from './getDeadline'
type Data = {
  isDisabled: boolean;
  symbols: string;
  language: string;
  format: string;
  service: string;
  name: string;
  email: string;
  comment: string;
  time: string;
  price: string;
}

export const getPriceAndDeadline = (data: Data, dispatch: Dispatch<any>) => {
  const numsOfSymbols: number = data.symbols.replace(/\s/g, '').length
  let price: number
  const isCyrillic =
      !!(data.language === 'ukrainian' || data.language === 'russian')
  const normalFormat =
      !!(data.format === 'rtf' || data.format === 'doc' || data.format === 'docx')
  dispatch(
    onChangeField('time', getDeadline(numsOfSymbols, isCyrillic, normalFormat))
  )

  if (isCyrillic) {
    price = 0.05 * numsOfSymbols
    price = price < 50 ? 50 : price
  } else {
    price = 0.12 * numsOfSymbols
    price = price < 120 ? 120 : price
  }

  price *= normalFormat ? 1 : 1.2
  if (!data.language || !data.symbols) {
    dispatch(onChangeField('sum', '0'))
    dispatch(onChangeField('time', ''))
  } else {
    dispatch(onChangeField('sum', price.toFixed(2)))
  }
  data.symbols && data.language
    ? dispatch(enableButton())
    : dispatch(disableButton())
}

import * as actionTypes from './types'

const initialState = {
  isDisabled: true,
  symbols: '',
  language: '',
  sum: '0',
  format: '',
  service: '',
  name: '',
  email: '',
  comment: '',
  time: '0'
}
interface IAction {
  type: string;
  field: string;
  value: string;
}
const onChangeReducer = (state = initialState, action: IAction) => {
  switch (action.type) {
    case actionTypes.ON_CHANGE:
      return {
        ...state,
        [action.field]: action.value
      }
    case actionTypes.ENABLE_BUTTON:
      return {
        ...state,
        isDisabled: false
      }
    case actionTypes.DISABLE_BUTTON:
      return {
        ...state,
        isDisabled: true
      }
  }
  return state
}

export default onChangeReducer

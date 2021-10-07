import * as actionTypes from './actions'

const initialState = {
  isDisabled: true,
  symbols: '',
  language: '',
  price: '0',
  format: '',
  service: '',
  name: '',
  email: '',
  comment: '',
  time: '0'
}

const onChangeReducer = (state = initialState, action: actionTypes.Action) => {
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

import * as actionTypes from './actions'
export function onChangeField (field: string, value: string) {
  return {
    type: actionTypes.ON_CHANGE,
    field,
    value
  }
}
export const enableButton = () => {
  return {
    type: actionTypes.ENABLE_BUTTON
  }
}
export const disableButton = () => {
  return {
    type: actionTypes.DISABLE_BUTTON
  }
}

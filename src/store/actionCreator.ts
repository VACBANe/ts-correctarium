import * as actionTypes from './types'

export const onChangeField = (field: string, value: string) => {
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

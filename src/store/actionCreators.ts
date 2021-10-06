import * as actionTypes from './types';


export function onChangeField (field: string, value: string) {
  return {
    type: actionTypes.ON_CHANGE,
    field,
    value
  }
}

export function enableButton () {
  return {
    type: actionTypes.ENABLE_BUTTON
  }
}
export function disableButton () {
  return {
    type: actionTypes.DISABLE_BUTTON
  }
}
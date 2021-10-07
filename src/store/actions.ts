export const ON_CHANGE = 'ON_CHANGE'
export const ENABLE_BUTTON = 'ENABLE_BUTTON'
export const DISABLE_BUTTON = 'DISABLE_BUTTON'

interface OnChangeField {
  type: 'ON_CHANGE'
  field: string;
  value: string;
}

interface EnableButton {
  type: 'ENABLE_BUTTON'
}

interface DisableButton {
  type: 'DISABLE_BUTTON'
}

export type Action =
  | OnChangeField
  | EnableButton
  | DisableButton

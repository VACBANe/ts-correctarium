import * as actionTypes from './types';

const initialState = {
  isDisabled: true
};
interface IAction {
  type: string;
}
const buttonReducer = (state = initialState, action: IAction) => {
  switch (action.type) {
    case actionTypes.ENABLE_BUTTON:
      return {
        ...state, isDisabled: false
      }
      case actionTypes.DISABLE_BUTTON:
        return {
          ...state, isDisabled: true
        }
  }
  return state;
};

export default buttonReducer;
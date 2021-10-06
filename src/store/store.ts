import { createStore } from 'redux'
import onChangeReducer from './onChangeReducer'
export const store = createStore(onChangeReducer)

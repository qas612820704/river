import { combineReducers } from 'redux';
import * as $ from './constants';

const id = (state = 'default') => {
  return state;
}

const name = (state = 'default') => {
  return state;
}

const definations = (state = [], action) => {
  switch (action.type) {
    case $.ADD_DEFINATION_IN_DICTIONARY:
      return [
        ...state,
        action.payload.definationId,
      ]

    case $.DEL_DEFINATION_IN_DICTIONARY:
      return state.filter(def => def.id !== action.payload.definationId);

    default:
      return state;
  }
}

export default combineReducers({
  id,
  name,
  definations,
});

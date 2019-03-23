import { combineReducers } from 'redux';

const TOGGLE_DEFINATION_IN_DICTIONARY = 'TOGGLE_DEFINATION_IN_DICTIONARY';
const ADD_DEFINATION_IN_DICTIONARY = 'ADD_DEFINATION_IN_DICTIONARY';
const DEL_DEFINATION_IN_DICTIONARY = 'DEL_DEFINATION_IN_DICTIONARY';

const name = (state = 'default') => {
  return state;
}

const words = (state = new Set(), action) => {
  switch (action.type) {
    case ADD_DEFINATION_IN_DICTIONARY:
      if (state.has(action.payload.definationId))
        return state;
      return new Set(state.add(action.payload.definationId));

    case DEL_DEFINATION_IN_DICTIONARY:
      const hasDeleted = state.delete(action.payload.definationId);
      return hasDeleted ? new Set(state) : state;

    case TOGGLE_DEFINATION_IN_DICTIONARY:
      state.has(action.payload.definationId)
        ? state.delete(action.payload.definationId)
        : state.add(action.payload.definationId);
      return new Set(state);
    default:
      return state;
  }
}

export function toggleDefinationInDictionary(definationId) {
  return {
    type: TOGGLE_DEFINATION_IN_DICTIONARY,
    payload: {
      definationId,
    }
  }
}

export function addDefinationInDictionary(definationId) {
  return {
    type: ADD_DEFINATION_IN_DICTIONARY,
    payload: {
      definationId,
    }
  }
}
export function delDefinationInDictionary(definationId) {
  return {
    type: DEL_DEFINATION_IN_DICTIONARY,
    payload: {
      definationId,
    }
  }
}

export default combineReducers({
  name,
  words,
});

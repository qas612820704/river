import { combineReducers } from 'redux';

const TOGGLE_DEFINATION_IN_DICTIONARY = 'TOGGLE_DEFINATION_IN_DICTIONARY';

const name = (state = 'default') => {
  return state;
}

const words = (state = new Set(), action) => {
  switch (action.type) {
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

export default combineReducers({
  name,
  words,
});

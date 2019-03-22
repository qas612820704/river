import { OrderedSet } from 'immutable';
import { combineReducers } from 'redux-immutable';

const TOGGLE_WORD_TO_DICTIONARY = 'TOGGLE_WORD_TO_DICTIONARY';

const name = (state = 'default', action) => {
  return state;
}

const wordList = (state = OrderedSet(), action) => {
  switch (action.type) {
    case TOGGLE_WORD_TO_DICTIONARY:
      return state.has(action.payload.word)
        ? state.remove(action.payload.word)
        : state.add(action.payload.word);
    default:
      return state;
  }
}

export function toggleWordToDictionary(word) {
  return {
    type: TOGGLE_WORD_TO_DICTIONARY,
    payload: {
      word,
    }
  }
}

export default combineReducers({
  name,
  wordList,
});

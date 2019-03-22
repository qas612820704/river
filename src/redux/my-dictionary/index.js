import { combineReducers } from 'redux';

const TOGGLE_WORD_TO_DICTIONARY = 'TOGGLE_WORD_TO_DICTIONARY';

const name = (state = 'default', action) => {
  return state;
}

const wordList = (state = new Set(), action) => {
  switch (action.type) {
    case TOGGLE_WORD_TO_DICTIONARY:
      state.has(action.payload.word)
        ? state.delete(action.payload.word)
        : state.add(action.payload.word);
      return new Set(state);
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

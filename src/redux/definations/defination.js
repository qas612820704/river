import { combineReducers } from 'redux';
import { MAP_DEFINATION_TO_DICTIONARY, UNMAP_DEFINATION_TO_DICTIONARY } from '../constants';

const id = (state = '') => {
  return state;
}

const word = (state = '') => {
  return state;
}

const level = (state = '') => {
  return state;
}

const domain = (state = '') => {
  return state;
}

const text = (state = '') => {
  return state;
}

const translate = (state = '') => {
  return state;
}

const examples = (state = []) => {
  return state;
}

const dictionaries = (state = [], action) => {
  switch (action.type) {
    case MAP_DEFINATION_TO_DICTIONARY:
      return [
        ...state,
        action.payload.dictionaryId,
      ];
    case UNMAP_DEFINATION_TO_DICTIONARY:
      return state.filter(
        dictionaryId => dictionaryId !== action.payload.dictionaryId
      );
    default:
      return state;
  }
}

export default combineReducers({
  id,
  word,
  level,
  domain,
  text,
  translate,
  examples,
  dictionaries,
});

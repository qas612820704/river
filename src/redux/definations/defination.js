import { combineReducers } from 'redux';
import { ADD_WORD } from '../words/constants';
import { RESTORE_DICTIONARY } from '../dictionaries/constants';

const id = (state = '', action) => {
  switch (action.type) {
    case ADD_WORD:
      return action.payload.defination.id;
    default:
      return state;
  }
}

const word = (state = '', action) => {
  switch (action.type) {
    case ADD_WORD:
      return action.payload.word;
    default:
      return state;
  }
}

const level = (state = '', action) => {
  switch (action.type) {
    case ADD_WORD:
      return action.payload.defination.level;
    default:
      return state;
  }
}

const domain = (state = '', action) => {
  switch (action.type) {
    case ADD_WORD:
      return action.payload.defination.domain;
    default:
      return state;
  }
}

const text = (state = '', action) => {
  switch (action.type) {
    case ADD_WORD:
      return action.payload.defination.text;
    default:
      return state;
  }
}

const translate = (state = '', action) => {
  switch (action.type) {
    case ADD_WORD:
      return action.payload.defination.translate;
    default:
      return state;
  }
}

const examples = (state = [], action) => {
  switch (action.type) {
    case ADD_WORD:
      return action.payload.defination.examples;
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
});

import { combineReducers } from 'redux';
import * as $ from './constants';

const word = (state = '', action) => {
  switch (action.type) {
    case $.ADD_WORD:
      return action.payload.word;
    default:
      return state;
  }
}

const explanations = (state = [], action) => {
  switch (action.type) {
    case $.ADD_WORD:
      return action.payload.explanations;
    default:
      return state;
  }
}

const searchCounter = (state = 0, action) => {
  switch (action.type) {
    case $.INCRESDE_WORD_SEARCH_COUNT:
      return state + 1;
    default:
      return state;
  }
}

const isFetching = (state = false, action) => {
  switch (action.type) {
    case $.REQUEST_FETCHING_WORD:
      return true;
    case $.SUCCESS_FETCHING_WORD:
    case $.REJECT_FETCHING_WORD:
      return false;
    default:
      return state;
  }
}

export default combineReducers({
  word,
  explanations,
  searchCounter,
  isFetching,
});

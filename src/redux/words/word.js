import Immutable, { List } from 'immutable';
import { combineReducers } from 'redux-immutable';
import * as $ from './constants';

const word = (state = '', action) => {
  switch (action.type) {
    case $.ADD_WORD:
      return action.payload.word;
    default:
      return state;
  }
}

const explanations = (state = List(), action) => {
  switch (action.type) {
    case $.ADD_WORD:
      return state.merge(Immutable.fromJS(action.payload.explanations));
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

export default combineReducers({
  word,
  explanations,
  searchCounter,
});

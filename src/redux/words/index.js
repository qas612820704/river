import { Map } from 'immutable';
import * as $ from './constants';

const words = (state = Map(), action) => {
  switch (action.type) {
    case $.ADD_WORD:
      return state.set(action.payload.word, action.payload.senses);
    default:
      return state;
  }
}

export default words;

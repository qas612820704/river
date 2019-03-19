import { Map } from 'immutable';
import word from './word';
import * as $ from './constants';

const words = (state = Map(), action) => {
  switch (action.type) {
    case $.ADD_WORD:
      return state.set(
        action.payload.word,
        word(
          state.get(action.payload.word),
          action,
        ),
      );
    default:
      return state;
  }
}

export default words;

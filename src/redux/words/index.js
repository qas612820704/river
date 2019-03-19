import { Map } from 'immutable';
import word from './word';

const words = (state = Map(), action) => {
  if (action.type.indexOf('WORD') > -1)
    return state.set(
      action.payload.word,
      word(
        state.get(action.payload.word),
        action,
      ),
    );
  return state;
}

export default words;

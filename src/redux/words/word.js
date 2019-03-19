import Immutable, { Map } from 'immutable';
import * as $ from './constants';

const word = (state = Map(), action) => {
  switch (action.type) {
    case $.ADD_WORD:
      return state.merge(Immutable.fromJS(action.payload));
    default:
      return state;
  }
}

export default word;

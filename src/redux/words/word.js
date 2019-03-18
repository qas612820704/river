import Immutable, { List } from 'immutable';
import * as $ from './constants';

const word = (state = List(), action) => {
  switch (action.type) {
    case $.ADD_WORD:
      return state.merge(Immutable.fromJS(action.payload));
    default:
      return state;
  }
}

export default word;

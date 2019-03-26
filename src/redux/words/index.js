import { mapValues } from 'lodash';
import word from './word';
import { ADD_ENTITIES, RESTORE_FROM_INDEXEDDB } from '../constants';

const words = (state = {}, action) => {
  if (action.type.includes('WORD')) {
    return {
      ...state,
      [action.payload.id]: word(
        state[action.payload.id],
        action
      ),
    };
  }

  switch (action.type) {
    case ADD_ENTITIES:
    case RESTORE_FROM_INDEXEDDB:
      return {
        ...state,
        ...mapValues(action.payload.words, w => word({
          ...state[w.id],
            ...w,
          },
          action,
        )),
      }
    default:
      return state;
  }
}

export default words;

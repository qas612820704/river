import { mapValues } from 'lodash';
import word from './word';
import { ADD_ENTITIES } from '../constants';

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

  if (action.type === ADD_ENTITIES)
    return {
      ...state,
      ...mapValues(action.payload.words, w => word({
        ...state[w.id],
          ...w,
        },
        action,
      )),
    }

  return state;
}

export default words;

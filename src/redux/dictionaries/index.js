import { mapValues } from 'lodash';
import dictionary from './dictionary';
import { RESTORE_FROM_INDEXEDDB } from '../constants';
const defaultDictionary = dictionary(undefined, { type: '@@INIT' });

const dictionaries = (
  state = {
    [defaultDictionary.id]: defaultDictionary,
  },
  action
) => {
  if (action.type.includes('DICT')) {
    return {
      ...state,
      [action.payload.dictionaryId]: dictionary(
        state[action.payload.dictionaryId],
        action,
      ),
    };
  }

  if (action.type === RESTORE_FROM_INDEXEDDB)
    return {
      ...state,
      ...mapValues(action.payload.dictionaries, d => {
        return dictionary(
          {
            ...state[d.id],
            ...d,
          },
          action,
        );
      }),
    };

  return state;
}

export default dictionaries;

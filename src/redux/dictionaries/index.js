import { mapValues } from 'lodash';
import dictionary from './dictionary';
import * as $ from '../constants';

const defaultDictionary = dictionary(undefined, { type: '@@INIT' });

const dictionaries = (
  state = {
    [defaultDictionary.id]: defaultDictionary,
  },
  action
) => {
  switch (action.type) {
    case $.ADD_DICTIONARY:
      const newDictionary = dictionary(undefined, action);

      return {
        ...state,
        [newDictionary.id]: newDictionary,
      };
    case $.DEL_DICTIONARY:
      const { dictionaryId } = action.payload;
      const { [dictionaryId]: _, ...restState } = state;
      return restState;
    case $.MAP_DEFINATION_TO_DICTIONARY:
    case $.UNMAP_DEFINATION_TO_DICTIONARY:
      return {
        ...state,
        [action.payload.dictionaryId]: dictionary(
          state[action.payload.dictionaryId],
          action,
        ),
      };
    case $.RESTORE_FROM_INDEXEDDB:
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
    default:
      return state;
  }
}

export default dictionaries;

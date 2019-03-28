import { mapValues } from 'lodash';
import defination from './defination';
import { MAP_DEFINATION_TO_DICTIONARY, UNMAP_DEFINATION_TO_DICTIONARY } from '../dictionaries/constants';
import { ADD_ENTITIES, RESTORE_FROM_INDEXEDDB } from '../constants';

const definations = (state = {}, action) => {
  switch (action.type) {
    case ADD_ENTITIES:
      return {
        ...state,
        ...mapValues(action.payload.definations, d => {
          return defination(
            {
              ...state[d.id],
              ...d,
              word: action.result,
            },
            action,
          )
        }),
      };
    case RESTORE_FROM_INDEXEDDB:
      return {
        ...state,
        ...mapValues(action.payload.definations, d => {
          return defination(
            {
              ...state[d.id],
              ...d,
            },
            action,
          )
        }),
      };
    case MAP_DEFINATION_TO_DICTIONARY:
    case UNMAP_DEFINATION_TO_DICTIONARY:
      return {
        ...state,
        [action.payload.definationId]: defination(
          state[action.payload.definationId],
          action
        ),
      };
    default:
      return state;
  }
}

export default definations;

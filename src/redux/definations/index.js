import { mapValues } from 'lodash';
import defination from './defination';
import { RESTORE_DICTIONARY } from '../dictionaries/constants';
import { ADD_ENTITIES } from '../constants';

const definations = (state = {}, action) => {
  switch (action.type) {
    case RESTORE_DICTIONARY:
    case ADD_ENTITIES:
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
    default:
      return state;
  }
}

export default definations;

import defination from './defination';
import { ADD_WORD } from '../words/constants';
import { RESTORE_DICTIONARY } from '../dictionaries/constants';

const definations = (state = {}, action) => {
  switch (action.type) {
    case ADD_WORD:
      const definations = action.payload.explanations
        .flatMap(exp => exp.senses)
        .flatMap(sense => sense.definations);

      return {
        ...state,
        ...definations.reduce((result, def) => {
            return {
              ...result,
              [def.id]: defination(
                state[def.id],
                {
                  ...action,
                  payload: {
                    ...action.payload,
                    defination: def,
                  }
                }
              ),
            };
          }, {}),
      }
    case RESTORE_DICTIONARY:
      return {
        ...state,
        ...action.payload.definations.reduce(
          (result, def) => {
            return {
              ...result,
              [def.id]: defination(
                def,
                action,
              ),
            };
          },
          {},
        )
      }
    default:
      return state;
  }
}

export default definations;

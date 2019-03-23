import { ADD_WORD } from '../words/constants';
import { RESTORE_DICTIONARY } from '../my-dictionary';

const definations = (state = {}, action) => {
  switch (action.type) {
    case ADD_WORD:
      return {
        ...state,
        ...action.payload.explanations
          .flatMap(exp => exp.senses)
          .flatMap(sense => sense.definations)
          .reduce((result, defination) => {
            return {
              ...result,
              [defination.id]: {
                word: action.payload.word,
                ...defination
              },
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
              [def.id]: def,
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

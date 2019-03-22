import { ADD_WORD } from '../words/constants';

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
    default:
      return state;
  }
}

export default definations;

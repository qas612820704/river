import word from './word';

const words = (state = {}, action) => {
  if (action.type.includes('WORD')) {
    return {
      ...state,
      [action.payload.word]: word(
        state[action.payload.word],
        action
      ),
    };
  }

  return state;
}

export default words;

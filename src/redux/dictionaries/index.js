import dictionary from './dictionary';

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
      [action.dictionaryId]: dictionary(
        state[action.dictionaryId],
        action,
      ),
    };
  }

  return state;
}

export default dictionaries;

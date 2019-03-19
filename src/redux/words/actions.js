import * as $ from './constants';

export function addWord({ word, explanations }) {
  return {
    type: $.ADD_WORD,
    payload: {
      word,
      explanations,
    },
  };
}

export function getWord(word) {
  return async (dispatch, getState) => {
    let isCached = getState().get('words').has(word);

    if (!isCached) {
      const result = await fetch(`http://localhost:9527/cambridge/english-chinese-traditional/${word}`)
        .then(res => res.json())

      dispatch(addWord(result));
    }

    dispatch({
      type: $.INCRESDE_WORD_SEARCH_COUNT,
      payload: { word },
    });

    return getState().getIn(['words', word]);
  }
}

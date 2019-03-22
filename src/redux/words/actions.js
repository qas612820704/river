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
    let isCached = getState().words[word];

    if (!isCached) {
      dispatch({
        type: $.REQUEST_FETCHING_WORD,
        payload: { word },
      });

      try {
        const result = await fetch(`http://localhost:9527/cambridge/english-chinese-traditional/${word}`)
          .then(res => res.json())

        dispatch(addWord(result));

        dispatch({
          type: $.SUCCESS_FETCHING_WORD,
          payload: { word },
        });
      } catch (e) {
        dispatch({
          type: $.REJECT_FETCHING_WORD,
          payload: { word },
        });
      }
    }

    return getState().words[word];
  }
}

export function increaseWordSearchCount(word) {
  return {
    type: $.INCRESDE_WORD_SEARCH_COUNT,
    payload: { word },
  };
}

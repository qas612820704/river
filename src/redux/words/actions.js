import { normalize } from 'normalizr';
import * as $ from './constants';
import { addEntities } from '../actions';

export function getWord(id) {
  return async (dispatch, getState, { schema }) => {
    let isCached = getState().words[id];

    if (!isCached) {
      dispatch({
        type: $.REQUEST_FETCHING_WORD,
        payload: { id },
      });

      try {
        const result = await fetch(`http://localhost:9527/cambridge/english-chinese-traditional/${id}`)
          .then(res => res.json())

        const data = normalize(result, schema.word);

        dispatch(addEntities(data.entities, data.result));

        dispatch({
          type: $.SUCCESS_FETCHING_WORD,
          payload: { id },
        });
      } catch (e) {
        console.error(e);
        dispatch({
          type: $.REJECT_FETCHING_WORD,
          payload: { id },
        });
      }
    }

    return getState().words[id];
  }
}

export function increaseWordSearchCount(id) {
  return {
    type: $.INCRESDE_WORD_SEARCH_COUNT,
    payload: { id },
  };
}

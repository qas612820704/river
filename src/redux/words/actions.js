import * as $ from './constants';
import { parseSenseHTML } from '../../cambridge-dictionary';

export function addWord(word, senses) {
  return {
    type: $.ADD_WORD,
    payload: {
      word,
      senses,
    },
  };
}

export function getWord(word) {
  return async (dispatch, getState) => {
    const senses = await fetch(`http://localhost:9527/cambridge/english/${word}`)
      .then(res => res.text())
      .then(text => parseSenseHTML(text))

    dispatch(addWord(word, senses));

    return {
      word,
      senses,
    };
  }
}

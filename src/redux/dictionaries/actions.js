import { mapKeys } from 'lodash';
import * as $ from './constants';

export function toggleDefinationInDictionary(definationId, dictionaryId='default') {
  return {
    type: $.TOGGLE_DEFINATION_IN_DICTIONARY,
    dictionaryId,
    payload: {
      definationId,
    }
  }
}

export function restoreDictionary(dictionaryId='default') {
  return async (dispatch, getState, { db }) => {
    const definationIds = await db.dictionary.keys();

    const definations = await Promise.all(
      definationIds.map(id => db.dictionary.get(id))
    );

    return dispatch({
      type: $.RESTORE_DICTIONARY,
      dictionaryId,
      payload: {
        definations: mapKeys(definations, d => d.id),
      },
    });
  };
}

export function addDefinationInDictionary(definationId, dictionaryId='default') {
  return (dispatch, getState, { db }) => {
    const defination = getState().definations[definationId];

    // TODO: this is async
    db.dictionary.set(definationId, defination);

    return dispatch({
      type: $.ADD_DEFINATION_IN_DICTIONARY,
      dictionaryId,
      payload: {
        definationId,
      }
    })
  }
}
export function delDefinationInDictionary(definationId, dictionaryId='default') {
  return (dispatch, _, { db }) => {
    db.dictionary.del(definationId);

    return dispatch({
      type: $.DEL_DEFINATION_IN_DICTIONARY,
      dictionaryId,
      payload: {
        definationId,
      }
    });
  }
}

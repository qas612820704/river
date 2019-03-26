import { mapKeys } from 'lodash';
import { ADD_ENTITIES, RESTORE_FROM_INDEXEDDB } from './constants';
export * from './words/actions';
export * from './dictionaries/actions';

export function addEntities(entities, result) {
  return {
    type: ADD_ENTITIES,
    payload: entities,
    result,
  };
}

export function restoreFromIndexedDB() {
  return async (dispatch, getState, { db }) => {
    const dictionaryPromises = db.dictionaries
      .keys()
      .then(dictionaryIds => dictionaryIds.map(id => db.dictionaries.get(id)))
      .then(promises => Promise.all(promises));
    const definationPromises = db.definations
      .keys()
      .then(definationIds => definationIds.map(id => db.definations.get(id)))
      .then(promises => Promise.all(promises));

    const [ dictionaries, definations ] = await Promise.all([ dictionaryPromises, definationPromises ]);

    return dispatch({
      type: RESTORE_FROM_INDEXEDDB,
      payload: {
        dictionaries: mapKeys(dictionaries, d => d.id),
        definations: mapKeys(definations, d => d.id),
      },
    });
  };
}

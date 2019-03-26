import * as $ from './constants';

export function mapDefinationToDictionary(definationId, dictionaryId='default') {
  return (dispatch, getState, { db }) => {

    dispatch({
      type: $.MAP_DEFINATION_TO_DICTIONARY,
      payload: {
        dictionaryId,
        definationId,
      }
    })

    const dictionary = getState().dictionaries[dictionaryId];
    const defination = getState().definations[definationId];
    // TODO: this is async
    db.dictionaries.set(dictionaryId, dictionary);
    db.definations.set(definationId, defination);

  }
}
export function unmapDefinationToDictionary(definationId, dictionaryId='default') {
  return (dispatch, _, { db }) => {
    dispatch({
      type: $.UNMAP_DEFINATION_TO_DICTIONARY,
      payload: {
        dictionaryId,
        definationId,
      }
    });

    db.dictionaries.del(dictionaryId);
    db.definations.del(definationId);
  }
}

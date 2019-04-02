import * as $ from './constants';

export function addDictionary(rawDictionary) {
  return (dispatch, getState, { db }) => {
    const dictionaryId = rawDictionary.name;

    dispatch({
      type: $.ADD_DICTIONARY,
      payload: {
        id: dictionaryId,
        ...rawDictionary,
      },
    });

    const dictionary = getState().dictionaries[dictionaryId];

    db.dictionaries.set(dictionaryId, dictionary);
  }
}
export function delDictionary(dictionaryId) {
  return (dispatch, _, { db }) => {
    dispatch({
      type: $.DEL_DICTIONARY,
      payload: {
        dictionaryId,
      },
    });

    db.dictionaries.delete(dictionaryId);
  };
}
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
  return (dispatch, getState, { db }) => {
    dispatch({
      type: $.UNMAP_DEFINATION_TO_DICTIONARY,
      payload: {
        dictionaryId,
        definationId,
      }
    });

    const dictionary = getState().dictionaries[dictionaryId];
    db.dictionaries.set(dictionaryId, dictionary);
    db.definations.delete(definationId);
  };
}

export function toggleMappingDefinationToDictionary(definationId, dictionaryId) {
  return (dispatch, getState) => {
    const defination = getState().definations[definationId];

    return defination.dictionaries.includes(dictionaryId)
      ? dispatch(unmapDefinationToDictionary(definationId, dictionaryId))
      : dispatch(mapDefinationToDictionary(definationId, dictionaryId));
  };
}

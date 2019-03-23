import { combineReducers } from 'redux';

export const RESTORE_DICTIONARY = 'RESTORE_DICTIONARY';
const TOGGLE_DEFINATION_IN_DICTIONARY = 'TOGGLE_DEFINATION_IN_DICTIONARY';
const ADD_DEFINATION_IN_DICTIONARY = 'ADD_DEFINATION_IN_DICTIONARY';
const DEL_DEFINATION_IN_DICTIONARY = 'DEL_DEFINATION_IN_DICTIONARY';

const name = (state = 'default') => {
  return state;
}

const words = (state = new Set(), action) => {
  switch (action.type) {
    case ADD_DEFINATION_IN_DICTIONARY:
      if (state.has(action.payload.definationId))
        return state;
      return new Set(state.add(action.payload.definationId));

    case DEL_DEFINATION_IN_DICTIONARY:
      const hasDeleted = state.delete(action.payload.definationId);
      return hasDeleted ? new Set(state) : state;

    case TOGGLE_DEFINATION_IN_DICTIONARY:
      state.has(action.payload.definationId)
        ? state.delete(action.payload.definationId)
        : state.add(action.payload.definationId);
      return new Set(state);

    case RESTORE_DICTIONARY:
      if (action.payload.definations.length === 0)
        return state;
      return new Set([
        ...state,
        ...action.payload.definations.map(def => def.id),
      ]);

    default:
      return state;
  }
}

export function toggleDefinationInDictionary(definationId) {
  return {
    type: TOGGLE_DEFINATION_IN_DICTIONARY,
    payload: {
      definationId,
    }
  }
}

export function restoreDictionary() {
  return async (dispatch, getState, { db }) => {
    const definationIds = await db.dictionary.keys();

    const definations = await Promise.all(
      definationIds.map(id => db.dictionary.get(id))
    );

    return dispatch({
      type: RESTORE_DICTIONARY,
      payload: {
        definations,
      },
    });
  };
}

export function addDefinationInDictionary(definationId) {
  return (dispatch, getState, { db }) => {
    const defination = getState().definations[definationId];

    // TODO: this is async
    db.dictionary.set(definationId, defination);

    return dispatch({
      type: ADD_DEFINATION_IN_DICTIONARY,
      payload: {
        definationId,
      }
    })
  }
}
export function delDefinationInDictionary(definationId) {
  return (dispatch, _, { db }) => {
    db.dictionary.del(definationId);

    return dispatch({
      type: DEL_DEFINATION_IN_DICTIONARY,
      payload: {
        definationId,
      }
    });
  }
}

export default combineReducers({
  name,
  words,
});

import { ADD_ENTITIES } from './constants';

export * from './words/actions';
export * from './dictionaries/actions';

export function addEntities(entities) {
  return {
    type: ADD_ENTITIES,
    payload: entities,
  };
}

import { denormalize } from 'normalizr';
import * as schema from '../api/schema';

export function selectWord(state, wordId) {
  return denormalize(wordId, schema.word, state);
}

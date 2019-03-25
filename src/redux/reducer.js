import { combineReducers } from 'redux';
import words from './words';
import dictionaries from './dictionaries';
import definations from './definations';

export default combineReducers({
  words,
  dictionaries,
  definations,
})

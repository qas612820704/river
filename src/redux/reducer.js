import { combineReducers } from 'redux';
import words from './words';
import myDictionary from './my-dictionary';
import definations from './definations';

export default combineReducers({
  words,
  myDictionary,
  definations,
})

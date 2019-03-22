import { combineReducers } from 'redux';
import words from './words';
import myDictionary from './my-dictionary';

export default combineReducers({
  words,
  myDictionary,
})

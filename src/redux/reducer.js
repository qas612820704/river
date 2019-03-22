import { combineReducers } from 'redux-immutable';
import words from './words';
import myDictionary from './my-dictionary';

export default combineReducers({
  words,
  myDictionary,
})

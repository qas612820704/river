import { combineReducers } from 'redux';

const id = (state = '') => {
  return state;
}

const name = (state = '') => {
  return state;
}

const level = (state = '') => {
  return state;
}

const domain = (state = '') => {
  return state;
}

const text = (state = '') => {
  return state;
}

const translate = (state = '') => {
  return state;
}

const examples = (state = []) => {
  return state;
}

export default combineReducers({
  id,
  name,
  level,
  domain,
  text,
  translate,
  examples,
});

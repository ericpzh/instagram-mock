import { createStore } from 'redux';
import combineReducers from '../reducers/index.js';

function save(state) {
  localStorage.setItem("state", JSON.stringify(state));
}

function load() {
  const state = localStorage.getItem("state");
  if (state)  return JSON.parse(state)
  return undefined;
}

const store = createStore(combineReducers/*, load()*/);

//store.subscribe(() => save(store.getState()));

export default store;

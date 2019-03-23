import { get, set, del, clear, keys, Store } from 'idb-keyval';
import { name } from '../../package.json';

function createStore(storeName) {
  const customStore = new Store(name, storeName);

  return {
    get: (...args) => get(...args, customStore),
    set: (...args) => set(...args, customStore),
    del: (...args) => del(...args, customStore),
    keys: (...args) => keys(...args, customStore),
    clear: (...args) => clear(...args, customStore),
  }
}

export const dictionary = createStore('dictionary');

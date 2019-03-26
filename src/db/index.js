import { mapKeys } from 'lodash';
import { openDB } from 'idb';
import { name } from '../../package.json';

function createStores(storeNames = []) {
  const dbPromise = openDB(name, 1, {
    upgrade(db) {
      for (let name of storeNames) {
        db.createObjectStore(name);
      }
    }
  });

  const stores = storeNames.map(name => {
    const api = {
      async get(key) {
        return (await dbPromise).get(name, key);
      },
      async getAll() {
        return (await dbPromise).getAll(name);
      },
      async set(key, val) {
        return (await dbPromise).put(name, val, key);
      },
      async delete(key) {
        return (await dbPromise).delete(name, key);
      },
      async clear() {
        return (await dbPromise).clear(name);
      },
      async keys() {
        return (await dbPromise).getAllKeys(name);
      },
    }

    return api;
  })

  return mapKeys(stores, (_, i) => storeNames[i]);
}

export const { definations, dictionaries } = createStores(['definations', 'dictionaries']);

export default function (Alpine) {
  window.__stores = {};
  Alpine.persistedStore = function (name, value, storage = localStorage) {
    let stored = storage.getItem(`__store_${name}`);

    if (![null, undefined].includes(stored)) {
      const storedValue = JSON.parse(stored);

      const diff = Object.entries(storedValue).reduce((acc, [key, val]) => {
        if (!storedValue.hasOwnProperty(key) || Object.getOwnPropertyDescriptor(value, key).get) return acc;
        acc[key] = val;
        return acc;
      }, {});

      value = Object.assign(value, diff);
      if (typeof storedValue == 'boolean') value = storedValue;
    }

    Alpine.store(name, value);

    window.__stores[name] = Alpine.effect(() => {
      const json = JSON.stringify(Alpine.store(name));

      storage.setItem(`__store_${name}`, json);
    });
  };
}

import { isValidHttpUrl } from '../../js/kwoka';

const cloudURL = 'https://res.cloudinary.com/dmaoqyvwt/image/fetch/f_auto,q_80,w_{width}/';

export default function (Alpine) {
  Alpine.directive('rias', (el, { expression }, { effect, evaluateLater }) => {
    let evaluate = evaluateLater(expression);

    effect(() => {
      evaluate((value) => {
        if (!isValidHttpUrl(value)) return console.log('IMG URL Not Valid');

        let imgBase = cloudURL + value;

        let widths = [180, 360, 540, 720, 900, 1080, 1296, 1512, 1728, 1944, 2160, 2376, 2592, 2808, 3024];
        let src = imgBase.replaceAll('{width}', widths[1]);
        let srcset = widths.map((w) => `${imgBase.replaceAll('{width}', w)} ${w}w`).join(',');

        mutateDom(() => {
          el.src = src;
          el.srcset = srcset;
          el.loading = el.loading || 'lazy';
        });
      });
    });
  });

  window.__kwokas = {};
  Alpine.persistedStore = function (name, value, storage = localStorage) {
    let stored = storage.getItem(`__kwoka_${name}`);

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

    window.__kwokas[name] = Alpine.effect(() => {
      const json = JSON.stringify(Alpine.store(name));

      storage.setItem(`__kwoka_${name}`, json);
    });
  };
}

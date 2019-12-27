let CLEANER_CALLBACKS = {};

/**
 *
 * @param {string} id identifiant de dropdown
 * @param {function} hook fonction de rappelle à invoquer
 */
export const setCallback = (id, hook) => {
  CLEANER_CALLBACKS[id] = hook;
};

/**
 *
 * @param  {...any} execpt identifiants de dropdownn a ne pas appliquer
 */
export const applyAll = (...execpt) => {
  Object.entries(CLEANER_CALLBACKS).forEach(([k, todo]) => {
    if (execpt.indexOf(k) === -1) {
      apply(k);
    }
  });
};

/**
 * Applique une fonction pour l'identifiant transmis
 * @param {string} id
 */
export const apply = id => {
  if (id in CLEANER_CALLBACKS && typeof CLEANER_CALLBACKS[id] === "function") {
    CLEANER_CALLBACKS[id]();
  }
};

/**
 *
 * @param {string} id
 * @param {function} callback
 */
export const add = (id, callback) => {
  if (typeof callback === "function") {
    CLEANER_CALLBACKS[id] = callback;
  }
};

/**
 *
 */
export const clearAll = () => {
  CLEANER_CALLBACKS = [];
};

/**
 *
 * @param {string} id
 */
export const clear = id => {
  delete CLEANER_CALLBACKS[id];
};

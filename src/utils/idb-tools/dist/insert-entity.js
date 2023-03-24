"use strict";
exports.__esModule = true;
function insert(db, storeName, entity) {
    return new Promise(function (resolve, reject) {
        var transaction = db.transaction(storeName, 'readwrite');
        var store = transaction.objectStore(storeName);
        var request = store.add(entity);
        request.onsuccess = function () {
            resolve(true);
        };
        request.onerror = function (e) {
            reject(false);
        };
    });
}
exports["default"] = insert;

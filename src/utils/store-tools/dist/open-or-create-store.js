"use strict";
exports.__esModule = true;
/* eslint-disable no-restricted-globals */
var constantes_1 = require("./constantes");
var get_idb_1 = require("../idb-tools/get-idb");
var IDB_REF = get_idb_1["default"]();
function openStorage(name, idbVersion) {
    if (idbVersion === void 0) { idbVersion = 1; }
    return new Promise(function (resolve, reject) {
        if (!IDB_REF) {
            reject('indexedDb not supported !');
        }
        var request = IDB_REF.open(name, idbVersion);
        var db;
        var doIt = true;
        request.onupgradeneeded = function (e) {
            doIt = false;
            db = this.result;
            var store = db.createObjectStore(constantes_1["default"].STORE_DATA_NAME, {
                keyPath: 'id'
            });
            db.createObjectStore(constantes_1["default"].STORE_INFO_NAME, {
                keyPath: 'name'
            });
            store.createIndex(constantes_1["default"].STORE_INDEX_NAME, 'tokens', {
                multiEntry: true
            });
            var txn = this.transaction;
            if (txn) {
                txn.oncomplete = function () {
                    resolve(db);
                };
            }
        };
        request.onsuccess = function () {
            if (doIt) {
                resolve(request.result);
            }
        };
        request.onerror = function (e) {
            reject(e);
        };
    });
}
exports["default"] = openStorage;

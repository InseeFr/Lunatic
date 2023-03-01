import { useEffect } from 'react';

function useOnlineStatus(online, offline) {
	useEffect(
		function () {
			if (window.navigator.onLine && typeof online === 'function') {
				online();
			} else if (typeof offline === 'function') {
				offline();
			}
		},
		[online, offline]
	);
	useEffect(
		function () {
			let callback;
			if (typeof online === 'function') {
				callback = function (e) {
					online();
				};
				window.addEventListener('online', callback);
			}
			return function () {
				if (callback) {
					window.removeEventListener('online', callback);
				}
			};
		},
		[online]
	);

	useEffect(
		function () {
			let callback;
			if (typeof offline === 'function') {
				callback = function (e) {
					offline();
				};
				window.addEventListener('offline', callback);
			}
			return function () {
				if (callback) {
					window.removeEventListener('offline', callback);
				}
			};
		},
		[offline]
	);
}

export default useOnlineStatus;
git commit -am "test : test unitaire pour le composant common variable-status" -m "BREAKING CHANGE : changement d'extension pour tous les fichiers contenant du jsx dans le dossier components et ajout de test Id dans le component variable-status"
import { useEffect } from 'react';

function useOnlineStatus(online: () => void, offline: () => void) {
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
			let callback: () => void;
			if (typeof online === 'function') {
				callback = function () {
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
			let callback: () => void;
			if (typeof offline === 'function') {
				callback = function () {
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

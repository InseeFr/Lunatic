import { useEffect } from 'react';
import { voidFunction } from '../../../../utils/function';

/**
 * Custom listener to avoid repetition in hooks
 */
function onWindowEvent<K extends keyof WindowEventMap>(
	eventName: K,
	callback: (this: Window, ev: WindowEventMap[K]) => any
) {
	window.addEventListener(eventName, callback);
	return () => {
		window.removeEventListener(eventName, callback);
	};
}

/**
 * Triggers callback when the browser disconnect or reconnect from the network
 */
export function useOnlineStatus(
	online: () => void = voidFunction,
	offline: () => void = voidFunction,
	navigator: { onLine?: boolean } = window.navigator
) {
	useEffect(() => {
		if (navigator.onLine) {
			online();
		} else {
			offline();
		}
	}, [online, offline]);
	useEffect(() => {
		return onWindowEvent('online', online);
	}, [online]);

	useEffect(() => {
		return onWindowEvent('offline', offline);
	}, [offline]);
}

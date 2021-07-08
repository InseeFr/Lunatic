import { useEffect } from 'react';

const CALLBACKS = {};

function getSignature(event, options = {}) {
	return Object.entries(options).reduce(function (a, [k, v]) {
		return `${a}-${k}-${v}`;
	}, event);
}

function createListener(event, options) {
	const signature = getSignature(event, options);
	const listener = function (e) {
		if (signature in CALLBACKS) {
			const { callbacks } = CALLBACKS[signature];
			callbacks.forEach(function (c) {
				c(e);
			});
		}
	};
	document.addEventListener(event, listener, options);
	return listener;
}

function unmount(event, callback, options) {
	const signature = getSignature(event, options);
	if (signature in CALLBACKS) {
		const { listener, callbacks } = CALLBACKS[signature];
		const index = callbacks.indexOf(callback);
		CALLBACKS[signature].callbacks.splice(index, 1);
		if (CALLBACKS[signature].callbacks.length === 0) {
			delete CALLBACKS[signature];
			document.removeEventListener(event, listener);
		}
	}
}

function mount(event, callback, options) {
	const signature = getSignature(event, options);
	if (!(signature in CALLBACKS)) {
		const listener = createListener(event, options);
		CALLBACKS[signature] = { listener, callbacks: [callback] };
	} else {
		CALLBACKS[signature] = {
			...CALLBACKS[signature],
			callbacks: [...CALLBACKS[signature].callbacks, callback],
		};
	}
}

function useDocumentAddEventListener(event, callback, options) {
	useEffect(
		function () {
			mount(event, callback, options);
			return function () {
				unmount(event, callback, options);
			};
		},
		[event, callback, options]
	);
}

export default useDocumentAddEventListener;

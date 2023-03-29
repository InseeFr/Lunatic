import { useCallback, useEffect, useRef } from 'react';
import { useRefSync } from '../../hooks/use-ref-sync';

function useDocumentAddEventListener<K extends keyof DocumentEventMap>(
	eventName: K,
	callback: (e: DocumentEventMap[K]) => void,
	options?: boolean | AddEventListenerOptions
) {
	// We want to avoid attaching / detaching listener constantly, create a ref to remember the callback
	const refCallback = useRefSync(callback);
	// Creates a never changing listener
	const listener = useCallback(
		(e: DocumentEventMap[K]) => {
			refCallback.current(e);
		},
		[refCallback]
	);

	useEffect(() => {
		document.addEventListener(eventName, listener, options);
		return () => {
			document.removeEventListener(eventName, listener, options);
		};
	}, [eventName, options]);
}

export default useDocumentAddEventListener;

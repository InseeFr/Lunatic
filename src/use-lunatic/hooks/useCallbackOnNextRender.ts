import { useCallback, useEffect, useRef } from 'react';

/**
 * Run a callback on that will be run on the next render
 */
export function useCallbackOnNextRender<T extends (...args: unknown[]) => void>(
	cb: T
): T {
	const callOnNextRender = useRef<Parameters<T> | null>(null);
	const cbRef = useRef(cb);
	cbRef.current = cb;

	// use useEffect to run the callback at the end of the next render
	useEffect(() => {
		if (callOnNextRender.current === null) {
			return;
		}
		try {
			cbRef.current(...callOnNextRender.current);
		} catch (e) {
			console.error(e);
		}
		callOnNextRender.current = null;
		// eslint-disable-next-line react-hooks/exhaustive-deps -- We want to run the callback when the value of the ref changed on the next render
	}, [callOnNextRender.current]);

	// When the function is called, we store the arguments to be called on the next render (when state was really updated)
	return useCallback((...args: Parameters<T>) => {
		callOnNextRender.current = args;
	}, []) as T;
}

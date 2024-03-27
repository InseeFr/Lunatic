import { type DependencyList, useEffect, useMemo, useState } from 'react';

import { debounce } from '../utils/function';
import { useRefSync } from './useRefSync';

export const useDebounce = <A extends unknown[], R = void>(
	fn: (...args: A) => R,
	ms: number
): ((...args: A) => Promise<R>) => {
	const fnRef = useRefSync(fn);
	const [debouncedFun, teardown] = useMemo(() => {
		return debounce<A, R>((...args) => fnRef.current(...args), ms);
	}, [fnRef, ms]);

	useEffect(() => teardown, [teardown]);

	return debouncedFun as (...args: A) => Promise<R>;
};

export const useDebouncedState = <A>(
	initialState: A,
	ms: number
): [A, (args: A) => void] => {
	const [state, setState] = useState(initialState);
	const debounceSetState = useDebounce(setState, ms);
	return [state, debounceSetState];
};

export const useEffectDebounced = (
	cb: () => void,
	deps: DependencyList,
	ms: number
) => {
	const debouncedCb = useDebounce(cb, ms);
	useEffect(() => {
		debouncedCb().catch(console.error);
	}, [debouncedCb, deps]);
};

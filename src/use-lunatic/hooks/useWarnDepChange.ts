import { useEffect, useRef } from 'react';
import type { LunaticLogger } from '../logger/type';

/**
 * Log a warning when the variable change
 * ensure that we received a memoized value and help debug
 */
export function useWarnDepChange(
	variable: unknown,
	message: string,
	logger: LunaticLogger
) {
	const firstRender = useRef(true);
	useEffect(() => {
		if (!firstRender.current) {
			logger({ type: 'WARNING', message });
		}
		firstRender.current = false;
	}, [variable]);
}

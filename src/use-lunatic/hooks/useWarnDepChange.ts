import { useEffect, useRef } from 'react';
import type { LunaticLogger } from '../logger/type';
import { useRefSync } from '../../hooks/useRefSync';

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
	const loggerRef = useRefSync(logger);
	useEffect(() => {
		if (!firstRender.current) {
			loggerRef.current({ type: 'WARNING', message });
		}
		firstRender.current = false;
	}, [variable, loggerRef, message]);
}

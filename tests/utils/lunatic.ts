import type { LunaticSource } from '../../src/use-lunatic/type-source';
import type { LunaticData, LunaticState } from '../../src/use-lunatic/type';
import reduceOnInit from '../../src/use-lunatic/reducer/reduce-on-init';
import INITIAL_STATE from '../../src/use-lunatic/initial-state';
import { type ActionInit, onInit } from '../../src/use-lunatic/actions';

/**
 * Generate a base state from a source / data for unit testing reducer
 */
export function generateState(
	source: LunaticSource,
	data: Record<string, unknown> = {
		CALCULATED: {},
		EXTERNAL: {},
		COLLECTED: {},
	},
	options: Partial<ActionInit['payload']> = {}
): LunaticState {
	return reduceOnInit(
		INITIAL_STATE,
		onInit({
			features: ['VTL'],
			source,
			data: 'COLLECTED' in data ? (data as LunaticData) : generateData(data),
			...options,
		} as ActionInit['payload'])
	);
}

/**
 * Generate LunaticData from a record of values
 */
export function generateData<T extends Record<string, unknown>>(
	data: T
): LunaticData {
	return {
		COLLECTED: Object.fromEntries(
			Object.entries(data).map(([key, value]) => [
				key,
				{
					CALCULATED: null,
					EXTERNAL: null,
					COLLECTED: value,
				},
			])
		) as Record<string, any>,
		CALCULATED: {},
		EXTERNAL: {},
	};
}

export function generateVariable({ type = 'COLLECTED', name = 'VARIABLE' }) {
	return {
		variableType: type,
		name: name,
		values: {
			PREVIOUS: null,
			COLLECTED: null,
			FORCED: null,
			EDITED: null,
			INPUTTED: null,
		},
	};
}

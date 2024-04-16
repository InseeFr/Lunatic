import type { LunaticData } from '../../src/use-lunatic/type';

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

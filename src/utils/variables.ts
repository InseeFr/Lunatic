import type { LunaticData, LunaticVariable } from '../use-lunatic/type';

/**
 * Extract the initial value from the source.json and data.json
 */
export function getInitialVariableValue(
	variable: LunaticVariable,
	data = {} as LunaticData
) {
	switch (variable.variableType) {
		case 'EXTERNAL':
		case 'CALCULATED':
			return data[variable.variableType]?.[variable.name];
		case 'COLLECTED': {
			const fromData = data.COLLECTED?.[variable.name]?.COLLECTED;
			if ('values' in variable && variable.values) {
				return fromData ?? variable.values.COLLECTED;
			}
			return fromData;
		}
		default:
			return null;
	}
}

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
		case 'COLLECTED':
			const collectedData = data.COLLECTED;
			let fromData;
			if (collectedData && variable.name in collectedData) {
				const { COLLECTED, FORCED } = collectedData[variable.name];
				fromData = COLLECTED ?? FORCED;
			}
			if ('values' in variable && variable.values) {
				const { COLLECTED, FORCED } = variable.values;
				return fromData ?? FORCED ?? COLLECTED;
			}
			return undefined;
		default:
			return null;
	}
}

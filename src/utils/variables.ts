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
				const { COLLECTED } = collectedData[variable.name];
				fromData = COLLECTED;
			}
			if ('values' in variable && variable.values) {
				const { COLLECTED } = variable.values;
				return fromData ?? COLLECTED;
			}
			return fromData ?? undefined;
		default:
			return null;
	}
}

import type { LunaticVariablesStore } from './lunatic-variables-store';
import type { LunaticSource } from '../../type-source';

export function getQuestionnaireData(
	store: LunaticVariablesStore,
	variables: LunaticSource['variables'],
	withCalculated: boolean = false
) {
	const result = {
		EXTERNAL: {} as Record<string, unknown>,
		CALCULATED: {} as Record<string, unknown>,
		COLLECTED: {} as Record<
			string,
			{
				EDITED: unknown;
				FORCED: unknown;
				INPUTED: unknown;
				PREVIOUS: unknown;
				COLLECTED: unknown;
			}
		>,
	};

	if (!variables) {
		return {};
	}

	for (const variable of variables) {
		// Skip calculated value if necessary
		if (variable.variableType === 'CALCULATED' && !withCalculated) {
			continue;
		}

		if (variable.variableType === 'COLLECTED') {
			result.COLLECTED[variable.name] = {
				...variable.values,
				COLLECTED: store.get(variable.name),
			};
		} else {
			result[variable.variableType][variable.name] = store.get(variable.name);
		}
	}
	return result;
}

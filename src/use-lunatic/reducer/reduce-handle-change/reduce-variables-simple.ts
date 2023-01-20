import { LunaticState } from '../../type';

/**
 * Add the value for the variable in the corresponding variable object
 */
function reduceVariablesSimple(
	variables: LunaticState['variables'],
	{ name, value }: { name: string; value: unknown }
): LunaticState['variables'] {
	if (name in variables) {
		const variable = variables[name];
		return {
			...variables,
			[name]: { ...variable, value },
		};
	}

	return variables;
}

export default reduceVariablesSimple;

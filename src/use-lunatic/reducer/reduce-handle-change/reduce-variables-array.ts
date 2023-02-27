import { resizeArrayVariable } from '../commons';
import { LunaticState } from '../../type';

type Args = { name: string; value: unknown; index: number; length: number };

/**
 * Inject the value at a specific index (and resize the value if necessary)
 */
function reduceVariablesArray(
	variables: LunaticState['variables'],
	args: Args
) {
	const { name, value, index, length } = args;
	if (name in variables) {
		const variable = variables[name];
		const { value: previousValue } = variable;

		// Ensure the value is an array of corresponding size
		let valueNext = [...resizeArrayVariable(previousValue, length)];

		// Inject the new value at the corresponding index
		valueNext[index] = value;
		return {
			...variables,
			[name]: { ...variable, value: valueNext },
		};
	}

	return variables;
}

export default reduceVariablesArray;

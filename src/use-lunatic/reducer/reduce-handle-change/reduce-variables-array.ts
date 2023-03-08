import { LunaticState } from '../../type';
import { resizeArray } from '../../../utils/array';

type Args = {
	name: string;
	value: unknown;
	iteration: number[];
	maxIteration: number[];
};

/**
 * Inject the value at a specific index (and resize the value if necessary)
 */
function reduceVariablesArray(
	variables: LunaticState['variables'],
	args: Args
): LunaticState['variables'] {
	const { name, value, iteration, maxIteration } = args;
	const variable = variables[name];
	if (!variable) {
		return variables;
	}

	let newValue = injectValue(
		structuredClone(variable.value),
		value,
		iteration,
		maxIteration
	);

	return {
		...variables,
		[name]: { ...variables[name], value: newValue },
	};
}

function injectValue(
	array: unknown,
	value: unknown,
	iteration: number[],
	sizes: number[]
) {
	if (iteration.length === 0) {
		return value;
	}
	const [index, ...nextIteration] = iteration;
	const [size, ...nextSizes] = sizes;
	const newArray = resizeArray(array, size + 1);
	newArray[index] = injectValue(
		newArray[index],
		value,
		nextIteration,
		nextSizes
	);
	return newArray;
}

export default reduceVariablesArray;

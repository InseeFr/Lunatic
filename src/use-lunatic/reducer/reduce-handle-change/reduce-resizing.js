import { getCompatibleVTLExpression } from '../../commons';
import { resizeArrayVariable } from '../commons';

function reduceResizing(state, action) {
	const {
		payload: {
			response: { name },
		},
	} = action;
	const { resizing, variables, updateBindings } = state;
	if (name in resizing) {
		const { size, variables: variableArray } = resizing[name];
		const { executeExpression } = state;
		const sizeValue = executeExpression(getCompatibleVTLExpression(size));
		const newArray = variableArray.reduce((acc, v) => {
			const { value } = variables[v];
			const newValue = resizeArrayVariable(value, sizeValue);
			updateBindings(v, newValue);
			return {
				...acc,
				[v]: { ...variables[v], value: newValue },
			};
		}, {});
		return { ...state, variables: { ...variables, ...newArray } };
	}
	return state;
}

export default reduceResizing;

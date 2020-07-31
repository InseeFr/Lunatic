import * as C from '../../../constants';

export const getRosterForLoopInitLines = (components) =>
	Array.isArray(components)
		? components.reduce(
				(_, c) =>
					c.response &&
					c.response.values[C.COLLECTED] &&
					c.response.values[C.COLLECTED].length > _
						? c.response.values[C.COLLECTED].length
						: _,
				0
		  )
		: 0;

export const getInvolvedVariables = (parentComponents) =>
	Array.isArray(parentComponents)
		? parentComponents
				.reduce((_, c) => {
					const { response, responses, components, depth, componentType } = c;
					if (response && response.name)
						return [..._, { name: response.name, depth }];
					if (responses || (components && componentType !== 'Loop'))
						return [..._, getInvolvedVariables(responses || components)];
					return _;
				}, [])
				.flat()
		: [];

export const lastRosterForLoopLineIsEmpty = (bindings) => (involvedVariables) =>
	bindings && involvedVariables
		? involvedVariables
				.map((iv) => iv.name)
				.filter((iv) => bindings[iv] && bindings[iv][bindings[iv].length - 1])
				.length === 0
		: true;

export const buildEmptyValue = (depth) => {
	if (!depth || depth === 1) return null;
	return new Array(depth - 1)
		.fill(null)
		.reduce((acc) => new Array(1).fill(acc), null);
};

import * as C from '../../../constants';

export const getLoopConstructorInitLines = (components) =>
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
					const { response, responses, components, depth } = c;
					if (response && response.name)
						return [..._, { name: response.name, depth }];
					if (responses || components)
						return [..._, getInvolvedVariables(responses || components)];
					return _;
				}, [])
				.flat()
		: [];

export const lastLoopChildLineIsEmpty = (bindings) => (involvedVariables) =>
	bindings && involvedVariables
		? involvedVariables
				.map((iv) => iv.name)
				.filter((iv) => bindings[iv] && bindings[iv][bindings[iv].length - 1])
				.length === 0
		: true;

export const buildEmptyValue = (depth) => {
	if (!Number(depth) || depth <= 2) return null;
	return new Array(depth - 2)
		.fill(null)
		.reduce((acc) => new Array(1).fill(acc), null);
};

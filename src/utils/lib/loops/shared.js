import * as C from '../../../constants';

export const getRosterForLoopInitLines = (components) =>
	Array.isArray(components)
		? components.reduce(
				(_, c) =>
					c.response
						? c.response.values[C.COLLECTED].length > _
							? c.response.values[C.COLLECTED].length
							: _
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

export const lastRosterForLoopLineIsEmpty = (bindings) => (involvedVariables) =>
	bindings && involvedVariables
		? involvedVariables.filter(
				(iv) => bindings[iv] && bindings[iv][bindings[iv].length - 1]
		  ).length === 0
		: true;

export const buildEmptyValue = (depth) => {
	if (!depth) return null;
	return new Array(depth)
		.fill(null)
		.reduce((acc) => new Array(1).fill(acc), null);
};

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

export const getInvolvedVariables = (components) =>
	components.reduce((_, c) => {
		const { response, responses, components } = c;
		if (response && response.name) return [..._, response.name];
		if (responses || components)
			return [..._, getInvolvedVariables(responses || components)];
		return _;
	}, []);

export const lastRosterForLoopLineIsEmpty = (components) =>
	components
		.reduce((acc, { response }) => [...acc, response.values[C.COLLECTED]], [])
		.map((vs) => vs[vs.length - 1])
		.filter((v) => v !== null).length === 0;

import * as C from '../../constants';

export const mergeQuestionnaireAndData = (questionnaire) => (data) => {
	if (!questionnaire || !questionnaire.components) return {};
	if (
		questionnaire.components.length === 0 ||
		!data ||
		Object.keys(data).length === 0
	)
		return questionnaire;
	const { components, variables, ...props } = questionnaire;

	const vars = buildVars(data)(variables);
	const filledComponents = buildFilledComponents(vars[C.COLLECTED])(components);

	return { ...props, components: filledComponents, variables: vars };
};

const buildVars = (data) => (variables) => {
	if (!Array.isArray(variables)) return {};
	const { COLLECTED: collectedData } = data;
	const collected = variables
		.filter(({ variableType }) => variableType === C.COLLECTED)
		.reduce((acc, { values, name, componentRef }) => {
			const d = (collectedData && collectedData[name]) || {};
			return {
				...acc,
				[name]: {
					componentRef,
					values: { ...values, ...d },
				},
			};
		}, {});
	return {
		EXTERNAL: variables
			.filter(({ variableType }) => variableType === C.EXTERNAL)
			.reduce((_, v) => ({ ..._, ...initExternalVariable(v)(data) }), {}),
		CALCULATED: variables
			.filter(({ variableType }) => variableType === C.CALCULATED)
			.reduce((_, v) => ({ ..._, ...initCalculatedVariable(v)(data) }), {}),
		COLLECTED: collected,
	};
};

const buildFilledComponents = (vars) => (components) =>
	components.map((c) => {
		if (c.response) return buildResponseComponent(vars)(c);
		else if (c.responses) return buildResponsesComponent(vars)(c);
		else if (c.cells) return buildCellsComponent(vars)(c);
		return c;
	});

export const buildResponseComponent = (vars) => (c) => ({
	...c,
	response: {
		name: c.response.name,
		values: vars[c.response.name].values,
	},
});

export const buildResponsesComponent = (vars) => (c) => {
	const { responses, ...rest } = c;
	const filledResponses = responses.map((r) => buildResponseComponent(vars)(r));
	return { ...rest, responses: filledResponses };
};

export const buildCellsComponent = (vars) => (c) => {
	const { cells, ...rest } = c;
	const filledCells = cells.map((row) => buildFilledComponents(vars)(row));
	return { ...rest, cells: filledCells };
};

const initExternalVariable = ({ name }) => (data) => ({
	[name]: (data && data.EXTERNAL && data.EXTERNAL[name]) || null,
});

const initCalculatedVariable = ({ name, expression }) => (data) => ({
	[name]: { expression, value: null },
});

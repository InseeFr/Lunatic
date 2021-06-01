import * as C from '../../constants';
import { interpret } from './interpret';

const INITIAL_DEPTH = 1;

export const mergeQuestionnaireAndData = (questionnaire) => (data) => {
	if (!questionnaire || !questionnaire.components) return {};
	if (questionnaire.components.length === 0) return questionnaire;
	const { components, variables, ...props } = questionnaire;

	const vars = buildVars(data || {})(variables);
	const filledComponents = buildFilledComponents(vars[C.COLLECTED])(components)(
		INITIAL_DEPTH
	);

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
	const EXTERNAL = variables
		.filter(({ variableType }) => variableType === C.EXTERNAL)
		.reduce((_, v) => ({ ..._, ...initExternalVariable(v)(data) }), {});
	return {
		EXTERNAL,
		COLLECTED: collected,
		CALCULATED: variables
			.filter(({ variableType }) => variableType === C.CALCULATED)
			.reduce(
				(_, v) => ({
					..._,
					...initCalculatedVariable(v)({ ...EXTERNAL, ...collected }),
				}),
				{}
			),
	};
};

const buildFilledComponents = (vars) => (components) => (depth) =>
	components.map((c) => {
		const component = { depth, ...c };
		return buildFilledComponent(vars)(component);
	});

export const buildFilledComponent = (vars) => (component) => {
	if (component.response) return buildResponseComponent(vars)(component);
	else if (component.responses) return buildResponsesComponent(vars)(component);
	else if (component.cells) return buildCellsComponent(vars)(component);
	else if (component.components)
		return buildComponentsComponent(vars)(component);
	return component;
};

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
	const { cells, depth, ...rest } = c;
	const filledCells = cells.map((row) =>
		buildFilledComponents(vars)(row)(depth)
	);
	return { ...rest, depth, cells: filledCells };
};

export const buildComponentsComponent = (vars) => (component) => {
	const { components, depth, ...rest } = component;
	const filledComponents = buildFilledComponents(vars)(components)(depth + 1);
	return { ...rest, depth, components: filledComponents };
};

const initExternalVariable =
	({ name }) =>
	(data) => ({
		[name]: (data && data.EXTERNAL && data.EXTERNAL[name]) || null,
	});

const initCalculatedVariable =
	({ name, expression, bindingDependencies }) =>
	(data) => {
		const bindings = Object.entries(data).reduce(
			(acc, [key, value]) => ({
				...acc,
				[key]:
					typeof value === 'string' || value === null
						? value
						: value.values[C.COLLECTED],
			}),
			{}
		);
		return {
			[name]: {
				expression,
				bindingDependencies,
				value: interpret(['VTL'])(bindings)(expression),
			},
		};
	};

import * as C from '../../constants';
import { interpret } from './interpret';
import {
	buildVectorialBindings,
	buildBindingsForDeeperComponents,
} from '../lib/loops/bindings';
import { isDev } from '../lib';

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

	if (isDev) {
		console.log('Start init vars');
		var start = new Date().getTime();
	}

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
	const bindings = Object.entries({ ...collected, ...EXTERNAL }).reduce(
		(acc, [k, v]) => {
			if (!v?.values)
				return {
					...acc,
					[k]: v,
				};
			return {
				...acc,
				[k]: v.values[C.COLLECTED],
			};
		},
		{}
	);

	const CALCULATED = variables
		.filter(({ variableType }) => variableType === C.CALCULATED)
		.reduce(
			(_, v) => ({
				..._,
				...getCalculatedVariables(v)(bindings),
			}),
			{}
		);

	if (isDev) console.log(`End init vars: ${new Date().getTime() - start} ms`);

	return {
		EXTERNAL,
		COLLECTED: collected,
		CALCULATED,
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

export const getCalculatedVariables =
	({ name, expression, bindingDependencies, shapeFrom }) =>
	(bindings) => {
		const value = getValue(
			bindings,
			bindingDependencies,
			expression,
			shapeFrom
		);
		if (shapeFrom)
			return {
				[name]: {
					expression,
					bindingDependencies,
					value,
					shapeFrom,
				},
			};
		return {
			[name]: {
				expression,
				bindingDependencies,
				value,
			},
		};
	};

const getValue = (bindings, bindingDependencies, expression, shapeFrom) => {
	const interestBindings = (bindingDependencies || []).reduce(
		(acc, b) => ({ ...acc, [b]: bindings[b] }),
		{}
	);
	if (!shapeFrom) {
		const vectorialBindings = buildVectorialBindings(interestBindings);
		const res = interpret(['VTL'])(vectorialBindings)(expression);
		return Array.isArray(res) ? res[0] : res;
	}
	const shape = bindings[shapeFrom];
	return buildShape(interestBindings, expression)(shape);
};

const buildShape = (bindings, expression) => (array) =>
	array.map((a, i) => {
		const loopBindings = buildBindingsForDeeperComponents(i)(bindings);
		if (Array.isArray(a)) {
			return buildShape(loopBindings, expression)(a);
		}
		const vectorialBindings = buildVectorialBindings(loopBindings);
		const res = interpret(['VTL'])(vectorialBindings)(expression);
		return Array.isArray(res) ? res[0] : res;
	});

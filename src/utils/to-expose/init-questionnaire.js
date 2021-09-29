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
				...getCalculatedVariables(v)(bindings, _),
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

export const buildResponseComponent = (vars) => (c) => {
	const { missingResponse } = c;
	const response = {
		name: c.response.name,
		values: vars[c.response.name].values,
	};
	if (missingResponse)
		return {
			...c,
			response,
			missingResponse: {
				name: missingResponse.name,
				values: vars[missingResponse.name].values,
			},
		};
	return {
		...c,
		response,
	};
};

export const buildResponsesComponent = (vars) => (c) => {
	const { responses, missingResponse, ...rest } = c;
	const filledResponses = responses.map((r) => buildResponseComponent(vars)(r));
	if (missingResponse)
		return {
			...rest,
			responses: filledResponses,
			missingResponse: {
				name: missingResponse.name,
				values: vars[missingResponse.name].values,
			},
		};
	return { ...rest, responses: filledResponses };
};

export const buildCellsComponent = (vars) => (c) => {
	const { cells, depth, missingResponse, ...rest } = c;
	const filledCells = cells.map((row) =>
		buildFilledComponents(vars)(row)(depth)
	);
	if (missingResponse)
		return {
			...rest,
			cells: filledCells,
			missingResponse: {
				name: missingResponse.name,
				values: vars[missingResponse.name].values,
			},
		};
	return { ...rest, depth, cells: filledCells };
};

export const buildComponentsComponent = (vars) => (component) => {
	const { components, depth, missingResponse, ...rest } = component;
	const filledComponents = buildFilledComponents(vars)(components)(depth + 1);
	if (missingResponse)
		return {
			...rest,
			components: filledComponents,
			missingResponse: {
				name: missingResponse.name,
				values: vars[missingResponse.name].values,
			},
		};
	return { ...rest, depth, components: filledComponents };
};

const initExternalVariable =
	({ name }) =>
	(data) => ({
		[name]: (data && data.EXTERNAL && data.EXTERNAL[name]) || null,
	});

// TODO: Handle "good" order when a calc var depends on another one
// TODO: Fix null vs 0 in Trevas JS
export const getCalculatedVariables =
	({ name, expression, bindingDependencies, shapeFrom }) =>
	(bindings, alreadyCalculatedVars) => {
		const value = getValue(
			bindings,
			bindingDependencies,
			expression,
			shapeFrom,
			alreadyCalculatedVars
		);
		const handleTempMomentValue =
			value && value._isAMomentObject ? value.format('DD-MM-YYYY') : value;
		if (shapeFrom)
			return {
				[name]: {
					expression,
					bindingDependencies,
					value: handleTempMomentValue,
					shapeFrom,
				},
			};
		return {
			[name]: {
				expression,
				bindingDependencies,
				value: handleTempMomentValue,
			},
		};
	};

const getValue = (
	bindings,
	bindingDependencies,
	expression,
	shapeFrom,
	alreadyCalculatedVars = {}
) => {
	const interestBindings = (bindingDependencies || []).reduce((acc, b) => {
		const bind = bindings[b];
		const bOrCV =
			!bind & (bind !== null) ? alreadyCalculatedVars[b]?.value : bind;
		return {
			...acc,
			[b]: bOrCV,
		};
	}, {});
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

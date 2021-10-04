import { interpret } from './interpret';
import {
	buildVectorialBindings,
	buildBindingsForDeeperComponents,
} from '../lib/loops/bindings';
import { isFunction } from '../lib';
import {
	CALCULATED_VAR_CATEGORY,
	EVENT_VALUE_CHANGE,
} from '../../constants/event-types';

export const getCalculatedVariablesTest =
	(variables) => (bindings, updatedVars, logFunction) => {
		let wip = {};
		return Object.entries(variables).reduce((acc, [name, v]) => {
			const value = getCalculatedVariable({ name, ...v })(variables)(
				bindings,
				wip,
				updatedVars,
				logFunction
			);
			return {
				...acc,
				[name]: value,
			};
		}, {});
	};

const getCalculatedVariable =
	(v) => (variables) => (bindings, wip, updatedVars, logFunction) => {
		const { bindingDependencies, name } = v;
		if (!Array.isArray(bindingDependencies)) return v;
		if (
			Array.isArray(updatedVars) &&
			updatedVars.length > 0 &&
			Array.isArray(bindingDependencies) &&
			!updatedVars.some((ai) => bindingDependencies.includes(ai))
		)
			return v;
		const exactBindings = bindingDependencies.reduce((acc, b) => {
			if (bindings[b] !== undefined) return { ...acc, [b]: bindings[b] };
			if (wip[b] !== undefined) return { ...acc, [b]: wip[b] };
			const varToCalc = variables[b];
			const newValue = getCalculatedVariable(varToCalc)(variables)(
				bindings,
				wip,
				updatedVars
			);
			wip[b] = newValue.value;
			return { ...acc, [b]: newValue.value };
		}, {});
		const { expression, shapeFrom } = v;
		const value =
			wip[name] !== undefined
				? wip[name]
				: getValue(bindings, exactBindings, expression, shapeFrom);
		const handleTempMomentValue =
			value && value._isAMomentObject ? value.format('DD-MM-YYYY') : value;

		if (
			isFunction(logFunction) &&
			// Filter only filterResult vars : name.startsWith('FILTER_RESULT_') &&
			JSON.stringify(value) !== JSON.stringify(variables[name].value)
		) {
			logFunction({
				idParadataObject: `${name}`,
				typeParadataObject: CALCULATED_VAR_CATEGORY,
				type: EVENT_VALUE_CHANGE,
				oldValue: value,
				newValue: variables[name]?.value,
			});
		}

		if (shapeFrom)
			return {
				expression,
				bindingDependencies,
				value: handleTempMomentValue,
				shapeFrom,
			};
		return {
			expression,
			bindingDependencies,
			value: handleTempMomentValue,
		};
	};

const getValue = (bindings, exactBindings, expression, shapeFrom) => {
	if (!shapeFrom) {
		const vectorialBindings = buildVectorialBindings(exactBindings);
		const res = interpret(['VTL'])(vectorialBindings)(expression);
		return Array.isArray(res) ? res[0] : res;
	}
	const shape = bindings[shapeFrom];
	return buildShape(exactBindings, expression)(shape);
};

const buildShape = (exactBindings, expression) => (array) =>
	array.map((a, i) => {
		const loopBindings = buildBindingsForDeeperComponents(i)(exactBindings);
		if (Array.isArray(a)) {
			return buildShape(loopBindings, expression)(a);
		}
		const vectorialBindings = buildVectorialBindings(loopBindings);
		const res = interpret(['VTL'])(vectorialBindings)(expression);
		return Array.isArray(res) ? res[0] : res;
	});

import { getComponentsFromState } from '../../commons';
import getSafetyExpression from '../../commons/execute-expression/get-safety-expression';

// export const CRITICALITY = {
// 	INFO: 'INFO',
// 	WARN: 'WARN',
// };

function resolveControl(state, control) {
	const { executeExpression, pager = {} } = state;
	const { iteration } = pager;
	const { criticality, errorMessage, id } = control;
	const { control: { value = 'true' } = {} } = control;
	try {
		const result = executeExpression(getSafetyExpression(value), { iteration });
		if (!result) {
			return { criticality, errorMessage, id };
		}
		return undefined;
	} catch (e) {
		console.log(`Error on validating control ${value}`);
		return undefined;
	}
}

function resolveComponentControls(state, controls) {
	return controls.reduce(function (errors, control) {
		const error = resolveControl(state, control);
		if (error) {
			return [...errors, error];
		}
		return errors;
	}, []);
}

function validateComponents(state, components) {
	// TODO check components in components (Loop, etc...)
	return components.reduce(function (errors, component) {
		const { controls, id } = component;
		if (Array.isArray(controls)) {
			const componentErrors = resolveComponentControls(state, controls);
			if (componentErrors.length) {
				return { ...errors, [id]: componentErrors };
			}
		}
		return errors;
	}, {});
}

// function isBlockingErrors(errors) {
// 	// TODO find criticality WARN
// 	return false;
// }

function isErrors(errors) {
	if (errors) {
		return Object.keys(errors).length > 0;
	}
	return false;
}

function createValidateReducer(reducer) {
	// Nothing to init
	return function (state, action) {
		const { payload } = action;
		const { block } = payload;
		const components = getComponentsFromState(state);
		const { errors: prec } = state;

		if (block) {
			return { ...state, errors: undefined };
		}

		if (prec) {
			return reducer({ ...state, errors: undefined }, action);
		}

		const errors = validateComponents(state, components);
		if (isErrors(errors)) {
			return { ...state, errors };
		}

		return reducer({ ...state, errors: undefined }, action);
	};
}

export default createValidateReducer;

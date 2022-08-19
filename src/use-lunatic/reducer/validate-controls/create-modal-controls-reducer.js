import { getComponentsFromState } from '../../commons';

// export const CRITICALITY = {
// 	INFO: 'INFO',
// 	WARN: 'WARN',
// };

function resolveControl(state, control) {
	const { executeExpression, pager = {} } = state;
	const { iteration } = pager;
	const { criticality, errorMessage, id, blocking } = control;
	const { control: { value = 'true' } = {} } = control;
	try {
		const result = executeExpression(value, { iteration });
		if (!result) {
			return { criticality, errorMessage, id, blocking };
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

function createModalControlsReducer(reducer) {
	// Nothing to init
	return function (state, action) {
		const { payload } = action;
		const { modalForControls } = state;
		const { block } = payload;
		// debugger;
		if (!modalForControls)
			return reducer({ ...state, modalErrors: undefined }, action);
		const components = getComponentsFromState(state);
		const { modalErrors: prec } = state;

		if (block) {
			return { ...state, modalErrors: undefined };
		}

		if (prec) {
			return reducer({ ...state, modalErrors: undefined }, action);
		}

		const modalErrors = validateComponents(state, components);
		if (isErrors(modalErrors)) {
			return { ...state, modalErrors };
		}

		return reducer({ ...state, modalErrors: undefined }, action);
	};
}

export default createModalControlsReducer;

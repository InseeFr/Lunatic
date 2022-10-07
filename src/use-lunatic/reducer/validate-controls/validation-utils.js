function resolveControl(state, control) {
	const { executeExpression, pager = {} } = state;
	const { iteration, shallowIteration } = pager;
	const { criticality, errorMessage, id, typeOfControl } = control;
	const { control: { value = 'true' } = {} } = control;
	try {
		const it = shallowIteration ?? iteration;
		const result = executeExpression(value, { iteration: it });
		if (!result) {
			const { value: labelValue } = errorMessage;
			const label = executeExpression(labelValue, { iteration: it });
			return {
				criticality,
				errorMessage: label,
				id,
				typeOfControl,
				formula: value,
				labelFormula: labelValue,
			};
		}
		return undefined;
	} catch (e) {
		console.log(`Error on validating control ${value}`);
		return undefined;
	}
}

export function resolveComponentControls(state, controls) {
	return controls.reduce(function (errors, control) {
		const error = resolveControl(state, control);
		if (error) {
			return [...errors, error];
		}
		return errors;
	}, []);
}

function resolveControl(state, control) {
	const { executeExpression, pager = {} } = state;
	const { iteration } = pager;
	const { criticality, errorMessage, id, blocking } = control;
	const { control: { value = 'true' } = {} } = control;
	try {
		const result = executeExpression(value, { iteration });
		if (!result) {
			const { value: labelValue } = errorMessage;
			const label = executeExpression(labelValue, { iteration });
			return {
				criticality,
				errorMessage: label || labelValue,
				id,
				blocking,
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

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

export function resolveComponentControls(state, controls) {
	return controls.reduce(function (errors, control) {
		const error = resolveControl(state, control);
		if (error) {
			return [...errors, error];
		}
		return errors;
	}, []);
}

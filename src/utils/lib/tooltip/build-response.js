export const buildMultiTooltipResponse = (options) => (response) => {
	if (!response || Object.keys(response).length === 0 || !options) return {};
	const { name, valueState } = response;
	const newValueState = valueState.map(({ valueType, value }) =>
		value === null
			? { valueType, value }
			: { valueType, value: options.find((o) => o.value === value).label }
	);
	return { name, valueState: newValueState };
};

export const buildBooleanTooltipResponse = (response) => {
	if (!response || Object.keys(response).length === 0) return {};
	const { name, valueState } = response;
	const newValueState = valueState.map(({ valueType, value }) =>
		value === null
			? { valueType, value }
			: { valueType, value: value ? 'Vrai' : 'Faux' }
	);
	return { name, valueState: newValueState };
};

export const initCheckboxResponse = response => {
	if (!response) return {};
	const { valueState, ...other } = response;
	if (!Array.isArray(valueState)) return {};
	const hasToBeModified =
		valueState.map(vs => vs.value).filter(v => v !== null).length === 0;
	if (hasToBeModified)
		return {
			...other,
			valueState: valueState.reduce(
				(acc, { valueType, value }) => [
					...acc,
					{ valueType, value: valueType === 'COLLECTED' ? false : value },
				],
				[]
			),
		};
	return { ...other, valueState };
};

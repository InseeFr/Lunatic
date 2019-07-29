export const buildTooltip = response => {
	if (!response || !response.valueState) return {};
	const { valueState } = response;
	const edited = get(valueState)('EDITED');
	const forced = get(valueState)('FORCED');
	const collected = get(valueState)('COLLECTED');
	if (edited && edited.value !== null) {
		if (forced && forced.value === null)
			return {
				content: [
					{
						key: 'Brute',
						value: collected.value !== null ? collected.value : ' - ',
					},
				],
				imgName: 'editedImg',
			};
		return {
			content: [
				{
					key: 'Brute',
					value: collected.value !== null ? collected.value : ' - ',
				},
				{
					key: 'Correction automatique',
					value: forced.value,
				},
			],
			imgName: 'editedImg',
		};
	}
	if (forced && forced.value !== null)
		return {
			content: [
				{
					key: 'Brute',
					value: collected.value !== null ? collected.value : ' - ',
				},
			],
			imgName: 'forcedImg',
		};
	return {};
};

const get = valueState => valueType =>
	valueState.find(v => v.valueType === valueType);

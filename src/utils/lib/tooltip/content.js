import * as C from '../../../constants';

export const buildTooltip = (response) => {
	if (
		!response ||
		!response.values ||
		Object.keys(response.values).length === 0
	)
		return {};
	const { values } = response;
	const edited = values[C.EDITED];
	const forced = values[C.FORCED];
	const collected = values[C.COLLECTED];
	if (edited) {
		if (!forced)
			return {
				content: [
					{
						key: 'Brute',
						value: collected || ' - ',
					},
				],
				imgName: 'editedImg',
			};
		return {
			content: [
				{
					key: 'Brute',
					value: collected || ' - ',
				},
				{
					key: 'Correction automatique',
					value: forced,
				},
			],
			imgName: 'editedImg',
		};
	}
	if (forced)
		return {
			content: [
				{
					key: 'Brute',
					value: collected || ' - ',
				},
			],
			imgName: 'forcedImg',
		};
	return {};
};

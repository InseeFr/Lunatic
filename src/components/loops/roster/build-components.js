import * as C from '../../../constants';

export const buildRosterUIComponents = (headers) => (components) => {
	const uiComponents = components.map((comp) => {
		const { response, ...other } = comp;
		const { name, values } = response;
		const size = values[C.COLLECTED].length;
		return [...Array(size).keys()].map((rowNumber) => {
			const newValues = Object.entries(values).reduce(
				(acc, [key, value]) => ({
					...acc,
					[key]: value[rowNumber],
				}),
				{}
			);
			return {
				...other,
				response: { name, values: newValues },
				rowNumber,
			};
		});
	}, []);
	const transpose = (m) => m[0].map((_, i) => m.map((x) => x[i]));
	const rows = transpose(uiComponents);
	return [headers, ...rows];
};

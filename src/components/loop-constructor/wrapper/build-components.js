import * as C from '../../../constants';

export const buildChildComponents = (headers) => (components) => {
	const uiComponents = components.map((comp) => {
		const { response, ...other } = comp;
		const { name, values } = response;
		const size = values[C.COLLECTED] ? values[C.COLLECTED].length : 0;
		return [...Array(size).keys()].map((rowNumber) => {
			const newValues = Object.entries(values).reduce(
				(acc, [key, value]) => ({
					...acc,
					[key]: value ? value[rowNumber] : null,
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

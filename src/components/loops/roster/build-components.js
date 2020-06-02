import * as C from '../../../constants';

export const buildRosterUIComponents = (headers) => (components) => {
	const uiComponents = components.map((comp) => {
		const { response, ...other } = comp;
		const { name, values } = response;
		const size = values[C.COLLECTED].length;
		return [...Array(size).keys()].map((i) => {
			const newValues = Object.entries(values).reduce((acc, [key, value]) => ({
				...acc,
				[key]: value[i],
			}));
			return {
				...other,
				response: { name, values: newValues },
			};
		});
	}, []);
	const transpose = (m) => m[0].map((x, i) => m.map((x) => x[i]));
	const rows = transpose(uiComponents);
	return [headers, ...rows];
};

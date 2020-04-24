import { emptyTableRow } from '../../../utils/lib';

export const buildTableComponents = headers => components => {
	const uiComponents = components.map(comp => {
		const { response, ...other } = comp;
		const { name, valueState } = response;
		const size = valueState.find(v => v.valueType === 'COLLECTED').value.length;
		return [...Array(size).keys()].map(i => {
			const newValueState = valueState.map(({ valueType, value }) => ({
				valueType,
				value: value[i],
			}));
			return {
				...other,
				response: { name, valueState: newValueState },
			};
		});
	}, []);
	const transpose = m => m[0].map((x, i) => m.map(x => x[i]));
	const rows = transpose(uiComponents);
	return [headers, ...rows];
};

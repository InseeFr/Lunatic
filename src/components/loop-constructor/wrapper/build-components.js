import * as C from '../../../constants';

export const buildContentForLoopConstructor = ({
	components,
	headers,
	bindingDependencies,
}) => {
	// Start hack to find interation number
	// Refactor if we have to handle complex components (vector, matrix)
	const iterations =
		components.find((c) => c.response?.name).response.values[C.COLLECTED]
			.length || 1;

	// End
	const initialArray = [...Array(iterations).keys()];
	const uiComponents = components.map((comp) => {
		const { response, ...other } = comp;
		if (!response) return initialArray.map(() => comp);
		// Handle reponses & cells components ?
		const { name, values } = response;
		return initialArray.map((rowNumber) => {
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
	return headers ? [headers, ...rows] : rows;
};

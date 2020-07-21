export const buildBindingsForLoopComponents = (index) => (bindings) =>
	Object.entries(bindings).reduce((_, [name, value]) => {
		if (Array.isArray(value)) return { ..._, [name]: value[index] || null };
		return { ..._, [name]: value };
	}, {});

const getDefaultDatasetStructure = (name, value) => ({
	[name]: { dataStructure: {}, dataPoints: { [name]: value } },
});

export const buildVectorialBindings = (bindings) =>
	Object.entries(bindings).reduce((_, [name, value]) => {
		if (Array.isArray(value))
			return {
				..._,
				...getDefaultDatasetStructure(name, value),
			};
		return { ..._, [name]: value };
	}, {});

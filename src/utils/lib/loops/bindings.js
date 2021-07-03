export const buildBindingsForDeeperComponents = (index) => (bindings) =>
	bindings
		? Object.entries(bindings).reduce((_, [name, value]) => {
				if (Array.isArray(value)) return { ..._, [name]: value[index] };
				return { ..._, [name]: value };
		  }, {})
		: {};

export const buildLoopBindings = (index) => (vars) =>
	Array.isArray(vars)
		? vars.reduce((_, [name, value]) => {
				if (Array.isArray(value)) return { ..._, [name]: value[index] };
				return { ..._, [name]: value };
		  }, {})
		: {};

export const buildLoopMissingResponse = (index) => (missingResponse) => {
	if ((!index && index !== 0) || !missingResponse) return undefined;
	const { name, values } = missingResponse;
	const newValues = Object.entries(values).reduce(
		(acc, [k, v]) => ({ ...acc, [k]: v[index] }),
		{}
	);
	return { name, values: newValues };
};

const getDefaultDatasetStructure = (name, value) => ({
	[name]: { dataStructure: {}, dataPoints: { [name]: value } },
});

export const buildVectorialBindings = (bindings) =>
	bindings
		? Object.entries(bindings).reduce((_, [name, value]) => {
				if (Array.isArray(value))
					return {
						..._,
						...getDefaultDatasetStructure(name, value),
					};
				return { ..._, [name]: value };
		  }, {})
		: {};

export const displayLoop = (dependencyList) => (bindings) => {
	if (!Array.isArray(dependencyList) || !bindings) return false;
	if (
		dependencyList.length === 1 &&
		(parseInt(bindings[dependencyList[0]], 10) ||
			bindings[dependencyList[0]] === null)
	)
		return true;
	return !(
		dependencyList
			.map((iv) =>
				Array.isArray(bindings[iv][0])
					? bindings[iv][0].flat()[0]
					: bindings[iv][0]
			)
			.filter((v) => v).length === 0
	);
};

export const displayLoopQuestion = (dependencyList) => (bindings) => {
	if (!Array.isArray(dependencyList) || !bindings) return false;
	return !(
		dependencyList
			.map((iv) =>
				Array.isArray(bindings[iv]) ? bindings[iv].flat()[0] : bindings[iv]
			)
			.filter((v) => v).length === 0
	);
};

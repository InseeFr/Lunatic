export const buildLoopComponents = (iterations) => (components) => {
	const toFlat = [...Array(iterations).keys()].map((rowNumber) =>
		buildFlatten(rowNumber)(components).map((c) => ({ ...c, rowNumber }))
	);
	return toFlat.flat();
};

const buildFlatten = (i) => (parentComponents) =>
	parentComponents.map((component) => {
		const { response, responses, components } = component;
		if (response) return buildFlattenResponse(i)(component);
		else if (responses)
			return {
				...component,
				responses: responses.map((r) => buildFlattenResponse(i)(r)),
			};
		else if (components)
			return { ...component, components: buildFlatten(i)(components) };
		else return component;
	});

const buildFlattenResponse = (i) => (component) => {
	const { response, ...other } = component;
	const { name, values } = response;
	const newValues = Object.entries(values).reduce(
		(acc, [key, value]) => ({ ...acc, [key]: value ? value[i] : null }),
		{}
	);
	return {
		...other,
		response: { name, values: newValues },
	};
};

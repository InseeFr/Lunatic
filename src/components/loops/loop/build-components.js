export const buildLoopComponents = (index) => (components) => {
	const flatten = [...Array(index).keys()].map((i) =>
		buildFlatten(i)(components)
	);
	return flatten.flat();
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
			return { ...component, component: buildFlatten(i)(components) };
		else return component;
	});

const buildFlattenResponse = (i) => (component) => {
	const { response, ...other } = component;
	const { name, values } = response;
	const newValues = Object.entries(values).reduce(
		(acc, [key, value]) => ({ ...acc, [key]: value[i] }),
		{}
	);
	return {
		...other,
		response: { name, values: newValues },
	};
};

export const buildLoopComponents = index => components => {
	const flatten = [...Array(index).keys()].map(i =>
		buildFlatten(i)(components)
	);
	return flatten.flat();
};

const buildFlatten = i => components =>
	components.map(component => {
		const indexedComponent = { ...component, loopIndex: i };
		const { componentType, response } = component;
		if (
			!componentType ||
			['Sequence', 'Subsequence', 'FilterDescription'].includes(componentType)
		)
			return indexedComponent;
		else if (response) return buildFlattenResponse(indexedComponent);
		else return indexedComponent;
	});

const buildFlattenResponse = component => {
	const { response, loopIndex, ...other } = component;
	const { name, valueState } = response;
	const newValueState = valueState.map(({ valueType, value }) => ({
		valueType,
		value: value[loopIndex],
	}));

	return {
		...other,
		response: { name, valueState: newValueState },
		loopIndex,
	};
};

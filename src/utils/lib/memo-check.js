import isEqual from 'lodash.isequal';

export const areEqual = (prevProps, props) => {
	const { bindingsDependency } = props;
	if (Array.isArray(bindingsDependency) && bindingsDependency.length > 0) {
		const { bindings: oldB } = prevProps;
		const { bindings: newB } = props;
		return !bindingsDependency
			.map((d) => isEqual(oldB[d], newB[d]))
			.includes(false);
	}
	return VarsHasBeenUpdated(prevProps, props);
};

const VarsHasBeenUpdated = (prevProps, props) => {
	const { response: oldR, responses: oldRs, cells: oldC } = prevProps;
	const { response: newR, responses: newRs, cells: newC } = props;
	if (!newR && !newRs && !newC) return true;
	return (
		(newR && isEqual(oldR, newR)) ||
		(newRs && isEqual(oldRs, newRs)) ||
		(newC && isEqual(oldC, newC))
	);
};

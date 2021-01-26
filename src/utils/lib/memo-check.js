import isEqual from 'lodash.isequal';

const VarsHasBeenUpdated = (prevProps, props) => {
	const { response: oldR, responses: oldRs, cells: oldC } = prevProps;
	const { response: newR, responses: newRs, cells: newC } = props;
	if (!newR && !newRs && !newC) return true;
	return !(
		(newR && isEqual(oldR, newR)) ||
		(newRs && isEqual(oldRs, newRs)) ||
		(newC && isEqual(oldC, newC))
	);
};
export const areEqual = (prevProps, props) => {
	if (VarsHasBeenUpdated(prevProps, props)) return false;
	const { bindingDependencies } = props;
	if (Array.isArray(bindingDependencies) && bindingDependencies.length > 0) {
		const { bindings: oldB } = prevProps;
		const { bindings: newB } = props;
		return !bindingDependencies
			.map((d) => isEqual(oldB[d], newB[d]))
			.includes(false);
	}
	return true;
};

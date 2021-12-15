function executeConditionFilter(filter, execute) {
	if (filter && typeof execute === 'function') {
		const { value, bindingDependencies } = filter;

		return execute(value, { bindingDependencies });
	}
	return undefined;
}

export default executeConditionFilter;

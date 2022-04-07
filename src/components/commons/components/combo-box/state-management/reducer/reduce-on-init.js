function reduceOnInit(state, action) {
	const { payload } = action;
	const { options, value, selectedIndex, getOptionValue } = payload;

	if (Array.isArray(options) && selectedIndex === undefined) {
		const next = options.reduce(function (current, option, index) {
			const optionValue = getOptionValue(option);
			if (value === optionValue) {
				return index;
			}
			return current;
		}, undefined);
		return { ...state, selectedIndex: next };
	}

	if (!value) {
		return { ...state, selectedIndex: undefined };
	}

	return state;
}

export default reduceOnInit;

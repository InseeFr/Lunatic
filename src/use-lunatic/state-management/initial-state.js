const initialState = {
	pages: undefined, // quick pages access
	values: undefined, // collected values
	pager: {
		pageTag: undefined,
		iterations: [],
		nbIterations: [],
		isFirst: true,
		isLast: true,
	},
	executeExpression: () => null,
};

export default initialState;

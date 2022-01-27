const initialState = {
	pages: undefined, // quick pages access
	values: undefined, // collected values
	pager: { pages: [], nbPages: [], iterations: [], nbIterations: [] },
	executeExpression: () => null,
};

export default initialState;

const INITIAL_STATE = {
	questionnaire: {},
	binding: {},
	variables: {},
	pages: {},
	isInLoop: false,
	isFirstPage: false,
	isLastPage: false,
	features: ['VTL'],
	pager: {
		page: undefined,
		maxPage: undefined,
		subPage: undefined,
		nbSubPages: undefined,
		iteration: undefined,
		nbIterations: undefined,
	},
	/* fonctionnalités vtl & md */
	updateBindings: () => {},
	executeExpression: () => {},
};

export default INITIAL_STATE;

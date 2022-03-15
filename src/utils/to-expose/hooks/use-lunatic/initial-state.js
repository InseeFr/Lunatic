const INITIAL_STATE = {
	variables: {}, // map des variables du questionnaires
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
	waiting: false,
	/* fonctionnalités vtl & md */
	updateBindings: () => {},
	executeExpression: () => {},
	handleChange: () => {},
};

export default INITIAL_STATE;

const INITIAL_STATE = {
	variables: {}, // map des variables du questionnaires
	bindingDependencies: {}, // map des variables vers les variables à recalculer
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

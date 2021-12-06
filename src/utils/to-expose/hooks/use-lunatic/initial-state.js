const INITIAL_STATE = {
	questionnaire: {},
	binding: {},
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
};

export default INITIAL_STATE;

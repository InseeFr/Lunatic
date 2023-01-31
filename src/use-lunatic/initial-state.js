import { COLLECTED, VTL } from '../utils/constants';

const INITIAL_STATE = {
	variables: {}, // map des variables du questionnaires
	pages: {},
	isInLoop: false,
	isFirstPage: false,
	isLastPage: false,
	features: [VTL],
	preferences: [COLLECTED],
	savingType: COLLECTED,
	cleaning: {},
	missingBlock: {},
	resizing: {},
	overview: [],
	pager: {
		page: undefined,
		maxPage: undefined,
		subPage: undefined,
		nbSubPages: undefined,
		iteration: undefined,
		shallowIteration: undefined,
		nbIterations: undefined,
	},
	waiting: false,
	errors: undefined,
	currentErrors: undefined,
	modalErrors: undefined,
	/* fonctionnalités vtl & md */
	updateBindings: () => {},
	executeExpression: () => {},
	handleChange: () => {},
	activeControls: false,
};

export default INITIAL_STATE;

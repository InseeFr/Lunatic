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
	pager: {
		page: undefined,
		maxPage: undefined,
		subPage: undefined,
		nbSubPages: undefined,
		iteration: undefined,
		shallowIteration: undefined,
		nbIterations: undefined,
		roundabout: undefined,
	},
	custom: undefined,
	waiting: false,
	errors: undefined,
	currentErrors: undefined,
	modalErrors: undefined,
	updateBindings: () => undefined,
	executeExpression: () => undefined,
	handleChange: () => undefined,
	goToPage: () => undefined,
	activeControls: false,
};

export default INITIAL_STATE;
import { COLLECTED, VTL } from '../utils/constants';
import type { LunaticState } from './type';

const INITIAL_STATE: LunaticState = {
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
		page: '1',
		maxPage: '1',
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
	executeExpression: (() => {}) as LunaticState['executeExpression'],
	handleChange: () => {},
	resetLoopBindings: () => {},
	setLoopBindings: () => {},
	activeControls: false,
};

export default INITIAL_STATE;

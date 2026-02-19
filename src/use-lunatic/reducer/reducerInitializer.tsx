import type {
	LunaticData,
	LunaticOptions,
	LunaticReducerState,
	LunaticSource,
} from '../type';
import { LunaticVariablesStore } from '../commons/variables/lunatic-variables-store';
import { checkLoops, createMapPages } from '../commons';
import { getExpressionAsString, getExpressionType } from '../../utils/vtl';
import { MD, VTL } from '../../utils/constants';
import { MDLabel } from '../../components/shared/MDLabel/MDLabel';
import { getPagerFromPageTag } from '../commons/pagination/page-tag';
import { buildOverview } from './overview/overviewOnInit';
import { forceInt } from '../../utils/number';
import { registerSuggesters } from '../../utils/search/SuggestersDatabase';
import type { RefObject } from 'react';
import type { LunaticLogger } from '../logger/type';

const basePager = {
	page: 1,
	maxPage: 1,
	subPage: undefined,
	nbSubPages: undefined,
	iteration: undefined,
	shallowIteration: undefined,
	nbIterations: undefined,
};
const baseState = {
	variables: new LunaticVariablesStore(),
	pager: basePager,
	previousPager: basePager,
	pages: {},
	isInLoop: false,
	updatedAt: Date.now(),
	overview: [],
	updateBindings: () => {},
	executeExpression: <T,>() => null as T,
	options: { disableFilters: false, disableFiltersDescription: true },
} satisfies LunaticReducerState;

const onChange = { current: () => {} };

export function reducerInitializer({
	source,
	data,
	features = ['VTL'],
	initialPage = '1',
	lastReachedPage = undefined,
	withOverview = false,
	disableFilters = false,
	disableFiltersDescription = true,
	getReferentiel,
	onVariableChange = onChange,
	logger = console.error,
}: {
	source: LunaticSource;
	data: LunaticData;
	features?: LunaticOptions['features'];
	initialPage?: LunaticOptions['initialPage'];
	lastReachedPage?: LunaticOptions['lastReachedPage'];
	withOverview?: LunaticOptions['withOverview'];
	disableFilters?: LunaticOptions['disableFilters'];
	disableFiltersDescription?: LunaticOptions['disableFiltersDescription'];
	getReferentiel?: LunaticOptions['getReferentiel'];
	onVariableChange?: RefObject<LunaticOptions['onVariableChange']>;
	logger?: LunaticLogger;
}): LunaticReducerState {
	const variables = LunaticVariablesStore.makeFromSource(source, data, {
		autoCommit: source.pagination !== 'question',
		changeHandler: onVariableChange,
		disableCleaning: disableFilters,
	});
	const pages = checkLoops(createMapPages(source));

	if (!source || !data) {
		return baseState;
	}

	// Register suggesters
	if (getReferentiel && source.suggesters) {
		registerSuggesters(source.suggesters, getReferentiel);
	}

	const executeExpression: LunaticReducerState['executeExpression'] = (
		expression,
		args = {}
	) => {
		// This is kept to ensure backward compatibility
		if (args?.bindingDependencies) {
			args.deps = args.bindingDependencies;
		}
		// Remove above code on next update
		const expressionType = getExpressionType(expression);
		const expressionString = getExpressionAsString(expression);
		// If VTL is not supported, or the expression does not use VTL, return the uninterpreted value
		if (!features?.includes(VTL) || !expressionType.includes(VTL)) {
			return expressionString;
		}
		try {
			const result = variables.run(expressionString, {
				...args,
				iteration:
					typeof args.iteration === 'number'
						? [args.iteration]
						: args.iteration,
			});
			if (
				features.includes(MD) &&
				expressionType.includes(MD) &&
				typeof result === 'string' &&
				result !== ''
			) {
				return <MDLabel expression={result} />;
			}
			return result as any;
		} catch (e) {
			if (logger) {
				// If there is an error interpreting a variable, return the raw expression
				logger({
					type: 'ERROR',
					error: e as Error,
				});
			}
			return expressionString;
		}
	};

	const updateBindings: LunaticReducerState['updateBindings'] = (
		variableName,
		value,
		options
	) => {
		variables.set(variableName, value, options);
	};

	const initialPager = getPagerFromPageTag(initialPage);
	const pager = {
		page: initialPager?.page ?? 1,
		maxPage: source.maxPage ? Number.parseInt(source.maxPage, 10) : 1,
		subPage: initialPager?.subPage,
		nbSubPages: undefined,
		iteration: initialPager?.iteration,
		nbIterations: undefined,
		lastReachedPage: lastReachedPage ?? initialPage,
	};

	return fillPagerForLoop({
		variables,
		pager,
		previousPager: pager,
		pages,
		isInLoop: pager.subPage !== undefined,
		updatedAt: Date.now(),
		overview: withOverview ? buildOverview(source) : [],
		updateBindings,
		executeExpression,
		options: { disableFilters, disableFiltersDescription },
	});
}

/**
 * Check if there is a loop and populate the pager accordingly
 **/
function fillPagerForLoop(state: LunaticReducerState): LunaticReducerState {
	const { pager, pages } = state;
	if (!(pager.page in pages)) {
		return state;
	}
	const { isLoop, subPages, iterations, loopDependencies } = pages[pager.page];

	if (
		// For loop, jump at the first page
		isLoop ||
		// For roundabout, jump at the desired iteration / subpage (only if defined)
		(pager?.iteration !== undefined && subPages)
	) {
		return {
			...state,
			isInLoop: true,
			pager: {
				...pager,
				subPage: pager?.subPage ?? 1,
				nbSubPages: (subPages ?? []).length,
				iteration: pager?.iteration ?? 0,
				nbIterations: forceInt(
					state.executeExpression(iterations, {
						deps: loopDependencies,
					})
				),
			},
		};
	}

	return state;
}

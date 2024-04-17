import type { LunaticSource } from '../type-source';
import type { LunaticOptions, LunaticData, LunaticReducerState } from '../type';
import { LunaticVariablesStore } from '../commons/variables/lunatic-variables-store';
import { checkLoops, createMapPages } from '../commons';
import { getExpressionAsString, getExpressionType } from '../../utils/vtl';
import { MD, VTL } from '../../utils/constants';
import { MDLabel } from '../../components/shared/MDLabel/MDLabel';
import { getPagerFromPageTag } from '../commons/page-tag';
import { buildOverview } from './overview/overviewOnInit';
import { forceInt } from '../../utils/number';

const baseState = {
	variables: new LunaticVariablesStore(),
	pager: {
		page: 1,
		maxPage: 1,
		subPage: undefined,
		nbSubPages: undefined,
		iteration: undefined,
		shallowIteration: undefined,
		nbIterations: undefined,
	},
	pages: {},
	isInLoop: false,
	updatedAt: Date.now(),
	overview: [],
	updateBindings: () => {},
	executeExpression: <T,>() => null as T,
} satisfies LunaticReducerState;

export function reducerInitializer({
	source,
	data,
	features = ['VTL'],
	initialPage = '1',
	lastReachedPage = undefined,
	withOverview = false,
}: {
	source: LunaticSource;
	data: LunaticData;
	features?: LunaticOptions['features'];
	initialPage?: LunaticOptions['initialPage'];
	lastReachedPage?: LunaticOptions['lastReachedPage'];
	withOverview?: LunaticOptions['withOverview'];
}): LunaticReducerState {
	const variables = LunaticVariablesStore.makeFromSource(source, data);
	const pages = checkLoops(createMapPages(source));

	if (!source || !data) {
		return baseState;
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
		if (!features?.includes(VTL) || !expressionType.includes(VTL)) {
			return expression;
		}
		const expressionString = getExpressionAsString(expression);
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
				typeof result === 'string'
			) {
				return <MDLabel expression={result} />;
			}
			return result as any;
		} catch (e) {
			// If there is an error interpreting a variable, return the raw expression
			console.error(`Cannot interpret expression : ${expressionString}`, e);
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
		maxPage: source.maxPage ? parseInt(source.maxPage, 10) : 1,
		subPage: undefined,
		nbSubPages: undefined,
		iteration: undefined,
		nbIterations: undefined,
		lastReachedPage: lastReachedPage ?? initialPage,
	};

	return fillPagerForLoop({
		variables,
		pager,
		pages,
		isInLoop: false,
		updatedAt: Date.now(),
		overview: withOverview ? buildOverview(source) : [],
		updateBindings,
		executeExpression,
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
	if (!isLoop) {
		return state;
	}
	return {
		...state,
		isInLoop: true,
		pager: {
			...pager,
			subPage: pager?.subPage ?? 0,
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
import { type ActionInit } from '../actions';
import { checkLoops, createMapPages, isFirstLastPage } from '../commons';
import compose from '../commons/compose';
import { getPagerFromPageTag } from '../commons/page-tag';
import type { LunaticState } from '../type';
import { reduceOverviewOnInit } from './overview/overview-on-init';
import { LunaticVariablesStore } from '../commons/variables/lunatic-variables-store';
import { MD, VTL } from '../../utils/constants';
import MdLabel from '../../components/commons/components/md-label';
import { getExpressionAsString, getExpressionType } from '../../utils/vtl';
import { forceInt } from '../../utils/number';

/**
 * Check if there is a loop and populate the pager accordingly
 */
function fillLoopState(
	state: LunaticState,
	initialPager: { page: string; subPage: number; iteration: number } | null
): LunaticState {
	const { pager, pages } = state;
	const { page } = pager;
	if (page in pages) {
		const { isLoop, subPages, iterations, loopDependencies } = pages[page];
		if (isLoop) {
			return {
				...state,
				isInLoop: true,
				pager: {
					...pager,
					subPage: initialPager?.subPage ?? 0,
					nbSubPages: (subPages ?? []).length,
					iteration: initialPager?.iteration ?? 0,
					nbIterations: forceInt(
						state.executeExpression(iterations, {
							deps: loopDependencies,
						})
					),
				},
			};
		}
	}
	return state;
}

function reduceOnInit(state: LunaticState, action: ActionInit) {
	const { payload } = action;
	const {
		source,
		data,
		initialPage,
		lastReachedPage,
		handleChange,
		preferences,
		savingType,
		management,
		shortcut,
		activeControls,
		goToPage,
		goNextPage,
		goPreviousPage,
		workersBasePath,
	} = payload;

	if (!source || !data) {
		return state;
	}

	const variables = LunaticVariablesStore.makeFromSource(source, data);
	const pages = checkLoops(createMapPages(source));
	const { maxPage, cleaning = {}, missingBlock = {} } = source;
	const initialPager = getPagerFromPageTag(initialPage);

	const pager = {
		page: initialPager?.page ?? '1',
		maxPage: maxPage,
		subPage: undefined,
		nbSubPages: undefined,
		iteration: undefined,
		nbIterations: undefined,
		lastReachedPage: lastReachedPage ?? initialPage,
	} satisfies LunaticState['pager'];

	const executeExpression: LunaticState['executeExpression'] = (
		expression,
		args = {}
	) => {
		// This is kept to ensure backward compatibility
		if (args?.bindingDependencies) {
			args.deps = args.bindingDependencies;
		}
		// Remove above code on next update
		const expressionType = getExpressionType(expression);
		const features = action.payload.features as string[];
		if (!features.includes(VTL) || !expressionType.includes(VTL)) {
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
				return <MdLabel expression={result} />;
			}
			return result as any;
		} catch (e) {
			// If there is an error interpreting a variable, return the raw expression
			console.error(`Cannot interpret expression : ${expressionString}`, e);
			return expressionString;
		}
	};

	const updateBindings: LunaticState['updateBindings'] = (
		variableName,
		value,
		options
	) => {
		variables.set(variableName, value, options);
	};

	const { isFirstPage, isLastPage } = isFirstLastPage(pager);

	return fillLoopState(
		{
			...state,
			cleaning,
			missingBlock,
			variables: variables,
			pages,
			isFirstPage,
			isLastPage,
			pager,
			executeExpression,
			updateBindings,
			handleChange,
			preferences,
			management,
			savingType,
			activeControls,
			goToPage,
			goNextPage,
			goPreviousPage,
			shortcut,
			workersBasePath,
		},
		initialPager
	);
}

const reducers = compose<ActionInit>(reduceOnInit, reduceOverviewOnInit);

export default reducers;

import { type ActionInit } from '../actions';
import { checkLoops, createMapPages, isFirstLastPage } from '../commons';
import compose from '../commons/compose';
import { getPagerFromPageTag } from '../commons/page-tag';
import type { LunaticData, LunaticState, LunaticVariable } from '../type';
import type { LunaticSource } from '../type-source';
import { reduceOverviewOnInit } from './overview/overview-on-init';
import { LunaticVariablesStore } from '../commons/lunatic-variables-store';
import { getInitialVariableValue } from '../../utils/variables';
import { MD, VTL } from '../../utils/constants';
import MdLabel from '../../components/commons/components/md-label';
import { getExpressionAsString, getExpressionType } from '../../utils/vtl';
import { forceInt } from '../../utils/number';

export type VariablesByType = {
	EXTERNAL: (LunaticVariable & { variableType: 'EXTERNAL' })[];
	COLLECTED: (LunaticVariable & { variableType: 'COLLECTED' })[];
	CALCULATED: (LunaticVariable & { variableType: 'CALCULATED' })[];
};

/**
 * Creates the variables object to set in the state
 */
function createVariablesStore(
	source: LunaticSource,
	data: LunaticData
): LunaticVariablesStore {
	const store = new LunaticVariablesStore();
	for (const variable of source.variables) {
		switch (variable.variableType) {
			case 'CALCULATED':
				store.setCalculated(
					variable.name,
					variable.expression.value,
					variable.bindingDependencies
				);
			case 'COLLECTED':
			case 'EXTERNAL':
				store.set(variable.name, getInitialVariableValue(variable, data));
		}
	}
	return store;
}

/**
 * Check if there is a loop and populate the pager accordingly
 */
function fillLoopState(
	state: LunaticState,
	initialPager: { page: string; subPage: number; iteration: number } | null
): LunaticState {
	const { pager, pages, dataStore } = state;
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
						dataStore.run(iterations, {
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
	} = payload;

	if (!source || !data) {
		return state;
	}

	const variables = createVariablesStore(source, data);
	const pages = checkLoops(createMapPages(source));
	const { maxPage, cleaning = {}, missingBlock = {}, resizing = {} } = source;
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
		args
	) => {
		const expressionType = getExpressionType(expression);
		const features = action.payload.features as string[];
		if (!features.includes(VTL) || !expressionType.includes(VTL)) {
			return expression;
		}
		const result = variables.run(getExpressionAsString(expression), args);
		if (
			features.includes(MD) &&
			expressionType.includes(MD) &&
			typeof result === 'string'
		) {
			return <MdLabel expression={result} />;
		}
		return result as any;
	};

	const updateBindings: LunaticState['updateBindings'] = (
		variableName,
		value
	) => {
		variables.set(variableName, value);
	};

	const { isFirstPage, isLastPage } = isFirstLastPage(pager);

	return fillLoopState(
		{
			...state,
			cleaning,
			missingBlock,
			resizing,
			dataStore: variables,
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
		},
		initialPager
	);
}

const reducers = compose<ActionInit>(reduceOnInit, reduceOverviewOnInit);

export default reducers;

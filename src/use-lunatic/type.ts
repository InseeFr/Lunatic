import type { FunctionComponent, PropsWithChildren, ReactNode } from 'react';
import type { ComponentType, ControlType, Variable } from './type-source';
import type { LunaticVariablesStore } from './commons/variables/lunatic-variables-store';
import type { IndexEntry } from '../utils/search/SearchInterface';
import type { InterpretedLunaticOverviewItem } from './hooks/useOverview';
import type { LunaticComponentProps } from '../components/type';

export type LunaticComponentDefinition<
	T extends ComponentType['componentType'] = ComponentType['componentType'],
> = ComponentType & { componentType: T };
export type LunaticControl = ControlType;

export type LunaticOverviewItem = {
	id: string;
	pageTag: string;
	page: number;
	label: LunaticExpression;
	description: LunaticExpression | undefined;
	type: string;
	conditionFilter?: LunaticExpression;
	iterations?: string;
};

export type VTLBindings = { [variableName: string]: unknown };

export type LunaticData = Partial<
	Record<Exclude<VariableType, 'COLLECTED'>, Record<string, unknown>> & {
		COLLECTED: Record<string, LunaticCollectedValue>;
	}
>;

export type LunaticValues = {
	[variableName: string]: unknown;
};

export type LunaticError = Pick<
	ControlType,
	'id' | 'criticality' | 'typeOfControl'
> & {
	errorMessage: ReactNode;
};

export type VariableType = 'COLLECTED' | 'EXTERNAL' | 'CALCULATED';
export type ExpressionType = 'VTL' | 'VTL|MD';
export type LunaticExpression = {
	value: string;
	type: ExpressionType;
	bindingDependencies?: string[];
};
export type TODO = unknown; // Temporary type to mark types as unresolved

export type PageTag = `${number}.${number}#${number}` | `${number}`;

export type LunaticVariable = Variable;
export type LunaticCollectedValue = Partial<{
	COLLECTED: unknown;
	EDITED: unknown;
	FORCED: unknown;
	INPUTTED: unknown;
	PREVIOUS: unknown;
}>;

// We need a mapped type to correlate type and variableType
export type LunaticStateVariable = {
	[key in LunaticVariable['variableType']]: {
		type: key;
		value: unknown;
		variable: LunaticVariable & { variableType: key };
		CalculatedLinked?: LunaticVariable[];
	};
}[LunaticVariable['variableType']];

export type LunaticPager = {
	lastReachedPage?: PageTag;
	maxPage: number;
	nbSubPages?: number;
	page: number;
	subPage?: number;
	// Iteration index (starting at 0)
	iteration?: number;
	nbIterations?: number;
	shallowIteration?: number;
	linksIterations?: number[];
};

export type LunaticReducerState = {
	variables: LunaticVariablesStore;
	overview: LunaticOverviewItem[];
	pager: LunaticPager;
	pages: {
		[key: number | string]:
			| {
					components: ComponentType[];
					isLoop: false;
					iterations?: undefined;
					loopDependencies?: undefined;
					subPages?: undefined;
			  }
			| {
					components: ComponentType[];
					isLoop: true;
					iterations: ExpressionType;
					// Variables affecting this loop
					loopDependencies: string[];
					// List of child pages (ex: ['20.1', '20.2']
					subPages: string[];
			  };
	};
	// Run and expression using the value from the state
	executeExpression: <T extends unknown = unknown>(
		expression: unknown,
		args?: {
			iteration?: number | number[];
			// @deprecated
			bindingDependencies?: string[];
			deps?: string[];
		}
	) => T;
	isInLoop: boolean;
	updatedAt: number;
	// Update the value collected for the variable
	updateBindings: (
		variableName: string,
		value: unknown,
		options: { iteration?: number[] }
	) => unknown;
};

export type LunaticOptions = {
	features?: LunaticState['features'];
	preferences?: LunaticState['preferences'];
	savingType?: LunaticState['savingType'];
	onChange?: LunaticState['handleChange'];
	management?: boolean;
	shortcut?: boolean;
	initialPage?: PageTag;
	lastReachedPage?: PageTag;
	autoSuggesterLoading?: boolean;
	getReferentiel?: (name: string) => Promise<Array<IndexEntry>>;
	activeControls?: boolean;
	withOverview?: boolean;
	missing?: boolean;
	missingStrategy?: () => void;
	missingShortcut?: { dontKnow: string; refused: string };
	dontKnowButton?: string;
	refusedButton?: string;
	// Enable change tracking to keep a track of what variable changed (allow using getChangedData())
	trackChanges?: boolean;
};

// Type representing the return type of "useLunatic()"
export type LunaticState = Omit<LunaticReducerState, 'overview'> & {
	overview: InterpretedLunaticOverviewItem[];
	pageTag: PageTag;
	updatedAt: number;
	Provider: FunctionComponent<PropsWithChildren>;
	variables: LunaticVariablesStore;
	pages: LunaticReducerState['pages'];
	isInLoop: boolean;
	isFirstPage: boolean;
	isLastPage: boolean;
	features: string[];
	preferences: ['COLLECTED'];
	savingType: 'COLLECTED';
	// Errors for the form
	errors?: { [page: string]: { [id: string]: LunaticError[] } };
	// Contains the errors for the current page / iteration
	currentErrors?: { [id: string]: LunaticError[] };
	// Errors
	modalErrors?: Record<string, LunaticError[]>;
	// Handler to call when updating a value
	handleChange: (
		response: { name: string },
		value: any,
		args?: {
			iteration?: number[];
		}
	) => void;
	// @deprecated use handleChange instead
	onChange?: (
		response: { name: string },
		value: any,
		args?: {
			iteration?: number[];
		}
	) => void;
	loopVariables: string[];
	// Enable controls for data (form validation)
	activeControls: boolean;
	// enable shortcut on radio/checkbox/missing buttons
	shortcut?: boolean;
	// TODO : Explain this
	management?: boolean;
	goToPage: (page: {
		page: PageTag | number;
		iteration?: number;
		nbIterations?: number;
		subPage?: number;
	}) => void;
	// Enable components to independently navigate next/previous
	goNextPage: () => void;
	goPreviousPage: () => void;
	compileControls: () => void;
	getComponents: (params?: {
		only?: LunaticComponentProps['componentType'];
		except?: LunaticComponentProps['componentType'];
	}) => LunaticComponentProps[];
	getData: (
		withRefreshedCalculated: boolean,
		variableNames?: string[]
	) => LunaticData;
	getChangedData: (reset: boolean) => LunaticData;
	resetChangedData: () => void;
	hasPageResponse: () => boolean;
};

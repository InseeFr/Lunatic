import type { FunctionComponent, PropsWithChildren, ReactNode } from 'react';
import type {
	ComponentDefinition,
	ControlDefinition,
	LunaticSource,
	SuggesterDefinition,
	Variable,
	VTLExpression,
	VTLScalarExpression,
} from '../type.source';
import type { LunaticVariablesStore } from './commons/variables/lunatic-variables-store';
import type { IndexEntry } from '../utils/search/SearchInterface';
import type { InterpretedLunaticOverviewItem } from './hooks/useOverview';
import type { LunaticComponentProps } from '../components/type';
export type { LunaticSource } from '../type.source';

export type LunaticComponentDefinition<T extends string = string> =
	ComponentDefinition & { componentType: T; page?: string };
export type LunaticControl = ControlDefinition;

export type LunaticOverviewItem = {
	id: string;
	pageTag: string;
	page: number;
	label: LunaticExpression;
	description: LunaticExpression | undefined;
	type: string;
	conditionFilter?: LunaticExpression;
	iterations?: LunaticExpression;
};

export type LunaticSuggester = SuggesterDefinition;

export type LunaticData = Partial<
	Record<Exclude<VariableType, 'COLLECTED'>, Record<string, unknown>> & {
		COLLECTED: Record<string, LunaticCollectedValue>;
	}
>;

export type LunaticValues = {
	[variableName: string]: unknown;
};

export type LunaticError = Pick<
	ControlDefinition,
	'id' | 'criticality' | 'typeOfControl'
> & {
	errorMessage: ReactNode;
};

export type VariableType = 'COLLECTED' | 'EXTERNAL' | 'CALCULATED';
export type LunaticExpression = VTLExpression | VTLScalarExpression;

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
	previousPager: LunaticPager;
	pager: LunaticPager;
	pages: {
		[key: number | string]:
			| {
					components: LunaticSource['components'];
					isLoop: false;
					iterations?: undefined;
					loopDependencies?: undefined;
					subPages?: undefined;
			  }
			| {
					components: LunaticSource['components'];
					isLoop: true;
					iterations: VTLScalarExpression;
					// Variables affecting this loop
					loopDependencies: string[];
					// List of child pages (ex: ['20.1', '20.2']
					subPages: string[];
			  };
	};
	// Run and expression using the value from the state
	executeExpression: <T extends unknown = unknown>(
		expression: VTLExpression,
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
	features?: ('MD' | 'VTL')[];
	preferences?: ['COLLECTED'];
	savingType?: 'COLLECTED';
	onChange?: LunaticChangesHandler;
	management?: boolean;
	// enable shortcut on radio/checkbox/missing buttons
	shortcut?: boolean;
	initialPage?: PageTag;
	lastReachedPage?: PageTag;
	autoSuggesterLoading?: boolean;
	getReferentiel?: (name: string) => Promise<Array<IndexEntry>>;
	// Enable controls for data (form validation)
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
export type LunaticState = {
	pager: LunaticPager;
	overview: InterpretedLunaticOverviewItem[];
	pageTag: PageTag;
	updatedAt: number;
	Provider: FunctionComponent<PropsWithChildren>;
	isInLoop: boolean;
	loopVariables: string[];
	isFirstPage: boolean;
	isLastPage: boolean;
	// Errors for the form
	errors?: { [page: string]: { [id: string]: LunaticError[] } };
	// Contains the errors for the current page / iteration
	currentErrors?: { [id: string]: LunaticError[] };
	// Errors
	modalErrors?: Record<string, LunaticError[]>;
	goToPage: (page: {
		page: PageTag | number;
		iteration?: number;
		nbIterations?: number;
		subPage?: number;
	}) => void;
	// Enable components to independently navigate next/previous
	goNextPage: () => void;
	goPreviousPage: () => void;
	compileControls: () => {
		currentErrors: Record<string, LunaticError[]> | undefined;
		isCritical: boolean;
	};
	getComponents: () => LunaticComponentProps[];
	getData: (
		withRefreshedCalculated: boolean,
		variableNames?: string[]
	) => LunaticData;
	getChangedData: (reset: boolean) => LunaticData;
	resetChangedData: () => void;
	hasPageResponse: () => boolean;
	// This is used for testing purpose only
	testing: {
		handleChanges: LunaticChangesHandler;
	};
};

export type LunaticChangesHandler = (
	args: {
		name: string;
		value: any;
		iteration?: number[];
	}[]
) => void;

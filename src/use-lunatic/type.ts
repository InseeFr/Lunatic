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
import type {
	EventArgs as LunaticVariablesStoreEvents,
	LunaticVariablesStore,
} from './commons/variables/lunatic-variables-store';
import type { IndexEntry } from '../utils/search/SearchInterface';
import type { InterpretedLunaticOverviewItem } from './hooks/useOverview';
import type { LunaticComponentProps } from '../components/type';
import type { LunaticLogger } from './logger/type';
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

/** Survey data. */
export type LunaticData = Partial<
	Record<Exclude<VariableType, 'COLLECTED'>, Record<string, unknown>> & {
		COLLECTED: Record<string, LunaticCollectedValue>;
	}
>;

export type LunaticValues = {
	[variableName: string]: unknown;
};

/**
 * Errors returned by `useLunatic` hook when an input check is made with their
 * id, criticity, type and the message to display to the user.
 */
export type LunaticError = Pick<
	ControlDefinition,
	'id' | 'criticality' | 'typeOfControl'
> & {
	errorMessage: ReactNode;
};

export type VariableType = 'COLLECTED' | 'EXTERNAL' | 'CALCULATED';
export type LunaticExpression = VTLExpression | VTLScalarExpression;

/**
 * Page numerotation.
 *
 * String representing a location in the survey. It has one of the following
 * format:
 * - [page].[sous-page]#[iteration], when we are in a loop or a roundabount
 * - [page]
 */
export type PageTag = `${number}.${number}#${number}` | `${number}`;

/** Variables provided to Lunatic through the source and used internally in a store. */
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

/**
 * Contains informations about navigation (last page reached, number of pages, subpages, etc.).
 *
 * This is the object used internally to determine where we are in the navigation.
 *
 * When we are in a loop, the pager will have additional properties.
 */
export type LunaticPager = {
	/** Last page reached. */
	lastReachedPage?: PageTag;
	/** Last page of the survey. */
	maxPage: number;
	/** Current page. */
	page: number;

	/**
	 * Current subpage.
	 *
	 * Only in a loop.
	 */
	subPage?: number;
	/**
	 * Number of pages in a loop.
	 *
	 * Only in a loop.
	 */
	nbSubPages?: number;
	/**
	 * Iteration index (starts at 0).
	 *
	 * Only in a loop.
	 */
	iteration?: number;
	/**
	 * Number of iterations (i.e. number of people).
	 *
	 * Only in a loop.
	 */
	nbIterations?: number;
	/**
	 * Only in a loop.
	 */
	shallowIteration?: number;
	/**
	 * Only in a loop.
	 */
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
					/** Variables affecting this loop. */
					loopDependencies: string[];
					/** List of child pages (ex: ['20.1', '20.2'] */
					subPages: string[];
			  };
	};
	/** Run an expression using the value from the state. */
	executeExpression: <T = unknown>(
		expression: VTLExpression,
		args?: {
			iteration?: number | number[];
			/** @deprecated  */
			bindingDependencies?: string[];
			deps?: string[];
		}
	) => T;
	isInLoop: boolean;
	updatedAt: number;
	/** Update the value collected for the variable. */
	updateBindings: (
		variableName: string,
		value: unknown,
		options: { iteration?: number[] }
	) => unknown;
	options: {
		disableFilters?: boolean;
	};
};

/** Specific behaviour options defined in the {@link useLunatic} hook. */
export type LunaticOptions = {
	/** Ignore filters. (default: `false`) */
	disableFilters?: boolean;
	/** Enable VTL and Markdown support. */
	features?: ('MD' | 'VTL')[];
	preferences?: ['COLLECTED'];
	/** Key in which the data is saved. (default: `"COLLECTED"`) */
	savingType?: 'COLLECTED';
	/** Function called when a variable is changed by a user input (must be memoized as it is used in dependency of a `useCallback` by the library). */
	onChange?: LunaticChangesHandler;
	onVariableChange?: (event: LunaticVariablesStoreEvents['change']) => void;
	/**
	 * Not yet implemented.
	 *
	 * Enable management mode which allow to handle multiple states of the same variable (used by recovery positions).
	 *
	 * The administrator can switch between `COLLECTED`, `EDITED`, `INPUTTED` modes. (default: `false`)
	 */
	management?: boolean;
	/** Enable keyboard shortcuts for checkboxes, radio buttons and missing buttons (default: `false`). */
	shortcut?: boolean;
	/** Starting page at launch. (default: `"1"`) */
	initialPage?: PageTag;
	/** Furthest page the user ever reached. */
	lastReachedPage?: PageTag;
	/** Enable the preemptive loading of suggester data on Lunatic initialization. (default: `false`) */
	autoSuggesterLoading?: boolean;
	/** Function called to fetch nomenclatures used by the suggesters. */
	getReferentiel?: (name: string) => Promise<Array<IndexEntry>>;
	/** Enable data controls (form validation). (default: `false`) */
	activeControls?: boolean;
	/** Enable overview system. (default: `false`) */
	withOverview?: boolean;
	/** Enable missing system. (default: `false`) */
	missing?: boolean;
	/** Function triggered when a missing button is clicked. */
	missingStrategy?: () => void;
	/** Keyboard shortcut that triggers missing buttons. */
	missingShortcut?: { dontKnow: string; refused: string };
	/** "Don't know" button label. */
	dontKnowButton?: string;
	/** "Refused" button label. */
	refusedButton?: string;
	/** Enable change tracking to keep a track of what variable changed (allow using getChangedData()). (default: `false`) */
	trackChanges?: boolean;
	logger?: LunaticLogger;
	componentsOptions?: { detailAlwaysDisplayed?: boolean };
};

/**
 * Return type of {@link useLunatic}.
 *
 * Allow to operate the survey.
 */
export type LunaticState = {
	/** Current pager. */
	pager: LunaticPager;
	overview: InterpretedLunaticOverviewItem[];
	/** Current page numerotation. */
	pageTag: PageTag;
	/** Date of the last `handleChange` function call. */
	updatedAt: number;
	/** Necessary component that must wraps `LunaticComponents` to make the library works. */
	Provider: FunctionComponent<PropsWithChildren>;
	/** Whether or not we're in a loop. */
	isInLoop: boolean;
	/** Current loop's variables. */
	loopVariables: string[];
	/** Whether or not we're on the survey first page. */
	isFirstPage: boolean;
	/** Whether or not we're on the survey last page (we reached `maxPage`). */
	isLastPage: boolean;
	/** Errors in the survey. */
	errors?: { [page: string]: { [id: string]: LunaticError[] } };
	/** Errors in the current page / iteration. */
	currentErrors?: { [id: string]: LunaticError[] };
	/** Errors in modal. */
	modalErrors?: Record<string, LunaticError[]>;
	/** Navigate to a specific page. */
	goToPage: (page: {
		page: PageTag | number;
		iteration?: number;
		nbIterations?: number;
		subPage?: number;
	}) => void;
	/** Navigate to the next page. */
	goNextPage: () => void;
	/** Navigate to the previous page. */
	goPreviousPage: () => void;
	/** Allow to fetch controls. */
	compileControls: () => {
		currentErrors: Record<string, LunaticError[]> | undefined;
		isCritical: boolean;
	};
	/**
	 * Components to display in the current page.
	 *
	 * Return an array with the various components' properties. The orchestrator
	 * has to handle how they are displayed, using the `componentType` property to
	 * select the appropriate component.
	 *
	 * @example
	 * // using `LunaticComponents`
	 * import { useLunatic, LunaticComponents } from '@inseefr/lunatic';
	 *
	 * function App({ source, data }) {
	 *   const { getComponents, Provider } = useLunatic(source, data, {});
	 *   const components = getComponents();
	 *
	 *   return (
	 *     <Provider>
	 *       <LunaticComponents components={components} />
	 *     </Provider>
	 *   );
	 * }
	 *
	 * @example
	 * // using custom components
	 * import { useLunatic, LunaticComponents } from '@inseefr/lunatic';
	 *
	 * const customCompoonents = {
	 *   Input: MyCustomInput,
	 *   InputNumber: MyCustomInputNumber,
	 * };
	 *
	 * function App({ source, data }) {
	 *   const { getComponents, Provider } = useLunatic(source, data, {});
	 *   const components = getComponents();
	 *
	 *   return (
	 *     <Provider>
	 *       <LunaticComponents components={components} slots={customComponents} />
	 *     </Provider>
	 *   );
	 * }
	 *
	 * @see {@link LunaticComponents}
	 */
	getComponents: () => LunaticComponentProps[];
	/** Get data collected by the survey. */
	getData: (
		withRefreshedCalculated: boolean,
		variableNames?: string[]
	) => LunaticData;
	/** Get data that have changed since last reset. Returns the same thing as `getData()`. */
	getChangedData: (reset?: boolean) => LunaticData;
	/** Empty the store of changed variables. */
	resetChangedData: () => void;
	/** Return `true` as soon as the current page has at least one answer. */
	hasPageResponse: () => boolean;
	/** Used for testing purpose only. */
	testing: {
		handleChanges: LunaticChangesHandler;
	};
};

/** Function taking as arguments the various changes the user has made. */
export type LunaticChangesHandler = (
	args: {
		name: string;
		value: any;
		iteration?: number[];
		removedIndex?: number;
	}[]
) => void;

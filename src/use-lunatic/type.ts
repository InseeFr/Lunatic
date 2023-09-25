import type { ReactNode } from 'react';
import type {
	ComponentType,
	ControlType,
	LunaticSource,
	Variable,
} from './type-source';
import { SuggesterStatus } from './use-suggesters';
import type { LunaticVariablesStore } from './commons/variables/lunatic-variables-store';

export type LunaticComponentDefinition<
	T extends ComponentType['componentType'] = ComponentType['componentType']
> = ComponentType & { componentType: T };
export type LunaticControl = ControlType;

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

export type LunaticVariable = Variable;
export type LunaticCollectedValue = {
	COLLECTED: unknown;
	EDITED: unknown;
	FORCED: unknown;
	INPUTED: unknown;
	PREVIOUS: unknown;
};

export type LunaticOverviewItem = {
	id: string;
	page: string;
	type: string;
	evaluatedLabel: string;
	visible: boolean;
	reached: boolean;
	parent?: unknown;
	label: LunaticExpression;
	conditionFilter?: {
		bindingDependencies?: string[];
	};
	children: LunaticOverviewItem[];
};

// We need a mapped type to correlate type and variableType
export type LunaticStateVariable = {
	[key in LunaticVariable['variableType']]: {
		type: key;
		value: unknown;
		variable: LunaticVariable & { variableType: key };
		CalculatedLinked?: LunaticVariable[];
	};
}[LunaticVariable['variableType']];

export type LunaticState = {
	updatedAt: number;
	variables: LunaticVariablesStore;
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
	isInLoop: boolean;
	isFirstPage: boolean;
	isLastPage: boolean;
	features: ['VTL'] | ['VTL', 'MD'];
	preferences: ['COLLECTED'];
	savingType: 'COLLECTED';
	// Map of variable associated with the expression used to repopulate it
	cleaning: LunaticSource['cleaning'];
	// Map of variable with the missing variable names associated with it ex: {ADR_COLL: ['ADR_COLL_MISSING']}
	missingBlock: { [variable: string]: string[] };
	// Map of variable with the missing variable names associated with it ex: {ADR_COLL: ['ADR_COLL_MISSING']}
	resizing: {
		[variable: string]: {
			// VTL expression
			size: string;
			// List of variables that will need resizing
			variables: string[];
			sizeForLinksVariables?: unknown;
			linksVariables?: string[];
		};
	};
	overview: LunaticOverviewItem[];
	pager: {
		lastReachedPage?: string;
		maxPage: string;
		nbSubPages?: number;
		page: string;
		subPage?: number;
		// Iteration index (starting at 0)
		iteration?: number;
		nbIterations?: number;
		shallowIteration?: number;
		linksIterations?: number[];
	};
	// TODO : Explain this
	waiting: boolean;
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
		args?: Record<string, unknown>
	) => void;
	// Run and expression using the value from the state
	executeExpression: <T extends unknown = unknown>(
		expression: unknown,
		args?: {
			iteration?: number;
			// @deprecated
			bindingDependencies?: string[];
			deps?: string[];
		}
	) => T;
	// Update the value collected for the variable
	updateBindings: (variableName: string, value: unknown) => unknown;
	// Enable controls for data (form validation)
	activeControls: boolean;
	// enable shortcut on radio/checkbox/missing buttons
	shortcut?: boolean;
	// TODO : Explain this
	management?: boolean;
	goToPage: (page: {
		page: string;
		iteration?: number;
		nbIterations?: number;
		subPage?: number;
	}) => void;
	// Enable components to independently navigate next/previous
	goNextPage: () => void;
	goPreviousPage: () => void;
	getSuggesterStatus: (name: string) => {
		status: SuggesterStatus;
		timestamp: number;
	};
};

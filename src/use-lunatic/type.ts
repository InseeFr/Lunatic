import { ReactNode } from 'react';
import { ComponentType, ControlType, Variable } from './type-source';

export type LunaticComponentDefinition = ComponentType;
export type LunaticControl = ControlType;

export type VTLBindings = { [variableName: string]: unknown };

export type LunaticData = {
	[key in 'CALCULATED' | 'COLLECTED' | 'EXTENAL']: {
		[variableName: string]: unknown;
	};
};

export type LunaticValues = {
	[variableName: string]: unknown;
};

export type LunaticError = Pick<
	ControlType,
	'id' | 'criticality' | 'typeOfControl'
> & {
	formula: string;
	labelFormula: string;
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

export type LunaticState = {
	variables: {
		[variableName: string]: {
			type: VariableType;
			value: unknown;
			variable: LunaticVariable;
			CalculatedLinked?: LunaticVariable[];
		};
	};
	pages: {
		[key: number | string]: {
			components: ComponentType[];
			isLoop?: boolean;
			iterations?: ExpressionType;
			// Variables affecting this loop
			loopDependencies?: string[];
			// List of child pages (ex: ['20.1', '20.2']
			subPages?: string[];
		};
	};
	isInLoop: boolean;
	isFirstPage: boolean;
	isLastPage: boolean;
	features: 'VTL'[];
	preferences: ['COLLECTED'];
	savingType: 'COLLECTED';
	// Map of variable associated with the expression used to repopulate it
	cleaning: { [variable: string]: string };
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
	pager: {
		lastReachedPage?: string;
		maxPage: string;
		nbSubPages?: number;
		page: string;
		subPage?: number;
		// Iteration index (starting at 0)
		iteration?: number;
		nbIterations?: number;
		shallowIteration?: TODO;
		linksIterations?: number[];
	};
	// TODO : Explain this
	waiting: boolean;
	// Errors for the form
	errors?: { [id: string]: LunaticError[] };
	// Contains the errors for the current page / iteration
	currentErrors?: LunaticError[];
	// TODO : Explain this
	modalErrors?: LunaticError[];
	// Handler to call when updating a value
	handleChange: (
		response: ResponseType,
		value: unknown,
		args: Record<string, unknown>
	) => void;
	// TODO : Explain this
	resetLoopBindings: (variables: TODO) => void;
	// Run and expression using the value from the state
	executeExpression: <T = unknown>(
		expression: unknown,
		args?: Record<string, unknown>
	) => T;
	// Update the value collected for the variable
	updateBindings: (variableName: string, value: unknown) => unknown;
	// TODO : Explain this
	setLoopBindings: (variables: TODO, iteration: TODO) => unknown;
	// TODO : Explain this
	activeControls: boolean;
	// TODO : Explain this
	management?: boolean;
};

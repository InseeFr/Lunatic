import { ReactNode } from 'react';

export type LunaticModel = {};

export type LunaticData = {
	[key in 'CALCULATED' | 'COLLECTED' | 'EXTENAL']: {
		[variableName: string]: unknown;
	};
};

export type VariableType = 'COLLECTED' | 'EXTERNAL' | 'CALCULATED';
export type ExpressionType = 'VTL' | 'VTL|MD';
export type Expression = {
	value: string;
	type: ExpressionType;
	bindingDependencies: string[];
};
export type TODO = unknown; // Temporary type to mark types as unresolved

export type ComponentDefinition = {
	bindingDependencies: string[];
	// Name of the component to use ex: "Loop"
	componentType: string;
	components: ComponentDefinition[];
	// Expression conditionnant l'affichage de ce composant
	conditionFilter: Expression;
	depth: number;
	hierarchy: {
		// Sequence linked to this component
		sequence: {
			id: string;
			label: Expression;
			// Page number ex: "17"
			page: string;
		};
	};
	id: string;
	// Number of iterations
	iterations?: Expression;
	loopDependencies?: string[];
	// List of child pages (ex: ['20.1', '20.2']
	subPages?: string[];
	/* These properties are linked with InputNumber type */
	mandatory?: boolean;
	decimals?: number;
	max?: number;
	min?: number;
	page?: string;
	response?: { name: string };
	unit?: string;
	/* /InputNumber */
};

export type LunaticError = {
	criticality: 'WARN';
	errorMessage: ReactNode;
	formula: string; // VTL Expression
	id: string;
	labelFormula: string; // VTL Expression
	typeOfControl: 'CONSISTENCY';
};

export type VariableDefinition<T = unknown> =
	| {
			name: string;
			variableType: 'COLLECTED' | 'EXTERNAL';
			values: {
				COLLECTED: T;
				EDITED: T;
				FORCED: T;
				INPUTED: T;
				PREVIOUS: T;
			};
	  }
	| {
			name: string;
			variableType: 'CALCULATED';
			// TODO : Explain this
			inFilter: string;
			// Expression used to calculate this variable
			expression: Expression;
			// List of variable name affecting this variable
			bindingDependencies?: string[];
	  };

export type LunaticState = {
	variables: {
		[variableName: string]: {
			type: VariableType;
			value: unknown;
			variable: VariableDefinition<unknown>[];
			CalculatedLinked?: VariableDefinition<unknown>[];
		};
	};
	pages: {
		[key: number]: {
			components: ComponentDefinition[];
			isLoop: boolean;
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
	};
	// TODO : Explain this
	waiting: boolean;
	// TODO : Explain this
	errors?: { [id: string]: LunaticError[] }[];
	// TODO : Explain this
	currentErrors?: { [id: string]: LunaticError[] };
	// TODO : Explain this
	modalErrors?: LunaticError[];
	// TODO : Explain this
	handleChange: (response: TODO, value: TODO, args: TODO) => void;
	// TODO : Explain this
	resetLoopBindings: (variables: TODO) => void;
	// TODO : Explain this
	executeExpression: (expression: TODO, args: TODO) => unknown;
	// TODO : Explain this
	updateBindings: (name: TODO, value: TODO) => unknown;
	// TODO : Explain this
	setLoopBindings: (variables: TODO, iteration: TODO) => unknown;
	// TODO : Explain this
	activeControls: boolean;
};

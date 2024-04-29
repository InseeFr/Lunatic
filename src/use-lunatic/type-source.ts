/**
 * Types used for source data (lunatic models and data.json)
 */
export type LabelType<
	T extends 'VTL' | 'VTL|MD' | 'TXT' = 'VTL' | 'VTL|MD' | 'TXT',
> = {
	value: string;
	type: T;
};

export type ValuesType<T = unknown> = {
	PREVIOUS: T | null;
	COLLECTED: T | null;
	FORCED: T | null;
	EDITED: T | null;
	INPUTTED: T | null;
};

export type ValuesTypeArray<T = unknown> = {
	PREVIOUS: T[] | [null];
	COLLECTED: T[] | [null];
	FORCED: T[] | [null];
	EDITED: T[] | [null];
	INPUTTED: T[] | [null];
};

export type DeclarationType = {
	id: string;
	declarationType:
		| 'INSTRUCTION'
		| 'COMMENT'
		| 'HELP'
		| 'CODECARD'
		| 'WARNING'
		| 'STATEMENT';
	position:
		| 'AFTER_QUESTION_TEXT'
		| 'AFTER_RESPONSE'
		| 'BEFORE_QUESTION_TEXT'
		| 'DETACHABLE';
	label: LabelType;
};

export type ConditionFilterType = LabelType & {
	bindingDependencies?: string[];
};

export type ControlType = {
	id: string;
	criticality: 'INFO' | 'WARN' | 'ERROR';
	typeOfControl: 'FORMAT' | 'CONSISTENCY';
	control: LabelType;
	errorMessage: LabelType;
	bindingDependencies?: string[];
	type?: 'roundabout' | 'ROW' | 'simple';
	iterations?: number;
};

export type ResponseType = { name: string };

export type SequenceDescription = {
	label: LabelType;
	id: string;
	page: string;
};

export type Hierarchy = {
	sequence: SequenceDescription;
	subSequence?: SequenceDescription;
};

export type ComponentTypeBase = {
	label: LabelType;
	description?: LabelType;
	declarations?: DeclarationType[];
	conditionFilter?: ConditionFilterType;
	controls?: ControlType[];
	id: string;
	bindingDependencies?: string[];
	hierarchy?: Hierarchy;
	mandatory?: boolean;
	page: string;
};
export type ComponentType =
	| (ComponentTypeBase & ComponentSequenceType)
	| (ComponentTypeBase & ComponentSubSequenceType)
	| (ComponentTypeBase & ComponentRosterForLoopType)
	| (ComponentTypeBase & ComponentLoopType)
	| (ComponentTypeBase & ComponentTableType)
	| (ComponentTypeBase & ComponentNumberType)
	| (ComponentTypeBase & ComponentDatePickerType)
	| (ComponentTypeBase & ComponentDurationType)
	| (ComponentTypeBase & ComponentCheckboxGroupType)
	| (ComponentTypeBase & ComponentCheckboxBooleanType)
	| (ComponentTypeBase & ComponentRadioType)
	| (ComponentTypeBase & ComponentFilterDescriptionType)
	| (ComponentTypeBase & ComponentDropdownType)
	| (Omit<ComponentTypeBase, 'label'> & ComponentPairWiseLinksType)
	| (ComponentTypeBase & ComponentRoundaboutType)
	| (ComponentTypeBase & ComponentSuggesterType)
	| (ComponentTypeBase & ComponentInputOrTextareaType)
	| (ComponentTypeBase & ComponentCheckboxOneType)
	| (ComponentTypeBase & ComponentQuestionType);

export type ComponentTypeEnum = ComponentType['componentType'];

export type ComponentInputOrTextareaType = {
	componentType: 'Input' | 'Textarea';
	maxLength: number;
	missingResponse?: ResponseType;
	response: ResponseType;
};

export type ComponentSequenceType = {
	componentType: 'Sequence';
	goToPage?: string;
};

export type ComponentSubSequenceType = {
	componentType: 'Subsequence';
	goToPage?: string;
};

export type ComponentRoundaboutType = {
	componentType: 'Roundabout';
	components: ComponentType[];
	iterations: LabelType;
	locked: boolean;
	expressions: Record<string, LabelType>;
};

export type ComponentRosterForLoopType = {
	componentType: 'RosterForLoop';
	components: ComponentType[];
	lines: { min: LabelType; max: LabelType };
	header?: {
		value: string;
		label: LabelType | string;
		options: Options;
		colspan?: number;
		rowspan?: number;
	}[];
	positioning: 'HORIZONTAL';
};

type PaginatedLoop = {
	paginatedLoop: true;
	maxPage: string;
	iterations: LabelType;
};

type BlockLoop = {
	paginatedLoop: false;
	lines: { min: LabelType; max: LabelType };
};

export type ComponentLoopType = {
	componentType: 'Loop';
	loopDependencies: string[];
	components: ComponentType[];
	depth: number;
} & (PaginatedLoop | BlockLoop);

export type ComponentTableType = {
	componentType: 'Table';
	header: ComponentRosterForLoopType['header'];
	body: (
		| { label: LabelType; colspan?: number; rowspan?: number }
		| (ComponentType & { colspan?: number; rowspan?: number })
	)[][];
};

export type ComponentNumberType = {
	componentType: 'InputNumber';
	unit?: string;
	response: ResponseType;
	min?: number;
	max?: number;
	decimals?: number;
};

export type ComponentDatePickerType = {
	componentType: 'Datepicker';
	dateFormat: 'YYYY-MM-DD' | 'YYYY' | 'YYYY-MM';
	response: ResponseType;
	min?: string;
	max?: string;
};

export type ComponentDurationType = {
	componentType: 'Duration';
	format: 'PnYnM' | 'PTnHnM';
	response: ResponseType;
};

export type ComponentCheckboxGroupType = {
	componentType: 'CheckboxGroup';
	description?: LabelType;
	responses: Array<{
		label: LabelType;
		description?: LabelType;
		response: ResponseType;
		id: string;
	}>;
};

export type ComponentCheckboxBooleanType = {
	componentType: 'CheckboxBoolean';
	response: ResponseType;
	missingResponse?: ResponseType;
};

type Options = { value: string; label: LabelType; description?: LabelType }[];

export type ComponentCheckboxOneType = {
	componentType: 'CheckboxOne';
	response: ResponseType;
	missingResponse?: ResponseType;
	options: Options;
};

export type ComponentRadioType = {
	componentType: 'Radio';
	options: Options;
	response: ResponseType;
	missingResponse?: ResponseType;
};

export type ComponentDropdownType = {
	componentType: 'Dropdown';
	options: Options;
	response: ResponseType;
	missingResponse?: ResponseType;
};

export type ComponentFilterDescriptionType = {
	componentType: 'FilterDescription';
	filterDescription: boolean;
};

export type ComponentPairWiseLinksType = {
	componentType: 'PairwiseLinks';
	xAxisIterations: LabelType;
	yAxisIterations: LabelType;
	symLinks: {
		[variableName: string]: Record<string, string | null>;
	};
	components: ComponentType[];
};

export type ComponentQuestionType = {
	componentType: 'Question';
	components: ComponentType[];
	description: LabelType;
};

export type ComponentSuggesterType = {
	componentType: 'Suggester';
	storeName: string;
	response: ResponseType;
	// Allow arbitrary option to be selected
	arbitrary?: {
		response: { name: string };
	};
	optionResponses: { name: string; attribute: string }[];
};

export type SuggesterType = {
	// Name of the list (will be used as storeName for suggester)
	name: string;
	// Fields to use for indexing the data
	fields: {
		// Property name in the JSON
		name: string;
		// Minimum length for a token to be indexed
		min?: number;
		// Regular expression to match words (ex: ["[\\w]+"])
		rules?: 'soft' | string[];
		// Language used for stemming (we only keep the root of a word).
		language?: 'French' | 'English';
		// Enable stemming
		stemmer?: boolean;
		// Define synonyms
		synonyms?: { [source: string]: string[] };
	}[];
	// Limit the number of results to return
	max?: number;
	// Ignored words (deprecated)
	stopWords?: string;
	// Overwrite order on the result using alphabetical order (deprecated: melauto handle order now)
	order?: { field: string; type: string };
	// How the search query will be parsed
	queryParser:
		| {
				// Search is done word by word (OR operator)
				type: 'tokenized';
				params: {
					// Language used for stemming (we only keep the root of a word).
					language: 'French' | 'English';
					// Regular expression to match words (ex: ["[\\w]+"])
					pattern: string;
					// Minimum length for a token to be used in the search
					min?: number;
				};
		  }
		| {
				type: 'soft';
				params: undefined;
		  };
	// Create a worker from a remote API (deprecated: not used currently)
	url?: string;
	// version (pas utilisé actuellement)
	version: number;
	// Enable "melauto" ranking, words closer to the start of the string are ranked better (deprecated: enabled by default)
	meloto?: boolean;
};

export type Variable =
	| {
			variableType: 'EXTERNAL';
			name: string;
			value: unknown;
	  }
	| {
			variableType: 'COLLECTED';
			name: string;
			values: ValuesType | ValuesTypeArray;
	  }
	| {
			variableType: 'CALCULATED';
			name: string;
			expression: LabelType;
			bindingDependencies?: string[];
			inFilter: string;
			shapeFrom?: string;
	  };

export type LunaticSource = {
	id: string;
	componentType?: 'Questionnaire';
	modele?: string;
	enoCoreVersion?: string;
	lunaticModelVersion?: string;
	generatingDate?: string;
	missing?: boolean;
	pagination?: 'question' | 'sequence';
	maxPage: string;
	label: LabelType;
	components: ComponentType[];
	variables: Variable[];
	suggesters?: SuggesterType[];
	cleaning: {
		[variableName: string]: {
			[variableName: string]: string;
		};
	};
	missingBlock?: {
		[variableName: string]: string[];
	};
	resizing: {
		[variableName: string]:
			| {
					size: string; // VTL Expression
					variables: string[];
			  }
			| {
					sizeForLinksVariables:
						| [string, string]
						| { xAxisSize: string; yAxisSize: string };
					linksVariables: string[];
			  }
			| {
					size: string; // VTL Expression
					variables: string[];
					sizeForLinksVariables:
						| [string, string]
						| { xAxisSize: string; yAxisSize: string };
					linksVariables: string[];
			  };
	};
};

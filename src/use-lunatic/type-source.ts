/**
 * Types used for source data (lunatic models and data.json)
 *
 * These types should not be used outside of use-lunatic
 */
export type LabelType = { value: string; type: 'VTL' | 'VTL|MD' };

export type ComponentTypeEnum =
	| 'Sequence'
	| 'Subsequence'
	| 'RosterForLoop'
	| 'Loop'
	| 'Table'
	| 'Input'
	| 'InputNumber'
	| 'Datepicker'
	| 'CheckboxGroup'
	| 'CheckboxOne'
	| 'CheckboxBoolean'
	| 'Radio'
	| 'Dropdown'
	| 'Textarea'
	| 'FilterDescription'
	| 'PairwiseLinks'
	| 'Suggester'
	| 'ComponentSet';

export type ValuesType<T = unknown> = {
	PREVIOUS: T | null;
	COLLECTED: T | null;
	FORCED: T | null;
	EDITED: T | null;
	INPUTED: T | null;
};

export type ValuesTypeArray<T = unknown> = {
	PREVIOUS: T[] | [null];
	COLLECTED: T[] | [null];
	FORCED: T[] | [null];
	EDITED: T[] | [null];
	INPUTED: T[] | [null];
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

export type ConditionFilterType = LabelType & { bindingDependencies: string[] };

export enum Criticality {
	INFO = 'INFO',
	WARN = 'WARN',
	ERROR = 'ERROR',
}

export enum TypeOfControl {
	FORMAT = 'FORMAT',
	CONSISTENCY = 'CONSISTENCY',
}

export enum ControlTypeEnum {
	roundabout = 'roundabout',
	simple = 'simple',
}

export type ControlType = {
	id: string;
	criticality: Criticality;
	typeOfControl: TypeOfControl;
	control: LabelType;
	errorMessage: LabelType;
	bindingDependencies: string[];
	type: ControlTypeEnum;
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
	declarations: DeclarationType[];
	conditionFilter: ConditionFilterType;
	controls?: ControlType[];
	id: string;
	storeName: string;
	bindingDependencies: string[];
	hierarchy: Hierarchy;
	missingResponse: ResponseType;
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
	| (ComponentTypeBase & ComponentCheckboxGroupType)
	| (ComponentTypeBase & ComponentCheckboxBooleanType)
	| (ComponentTypeBase & ComponentRadioType)
	| (ComponentTypeBase & ComponentFilterDescriptionType)
	| (ComponentTypeBase & ComponentDropdownType)
	| (ComponentTypeBase & ComponentSuggesterType)
	| (ComponentTypeBase & ComponentPairWiseLinksType)
	| (ComponentTypeBase & ComponentRoundaboutType)
	| (ComponentTypeBase & {
			componentType: 'Input' | 'CheckboxOne' | 'Textarea';
	  })
	| (ComponentTypeBase & ComponentComponentSet);

export type ComponentSequenceType = {
	componentType: 'Sequence';
};

export type ComponentSubSequenceType = {
	componentType: 'Subsequence';
	gotoPage: string;
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
	header: {
		value: string;
		label: LabelType | string;
		options: { value: string; label: LabelType }[];
		colspan?: number;
		rowspan?: number;
	}[];
	body: {
		label?: LabelType;
		value?: string;
		format?: string;
		dateFormat?: string;
		unit?: string;
		options: { value: string; label: LabelType }[];
		response: ResponseType;
		bindingDependencies: string[];
		componentType?: ComponentTypeEnum;
		maxLength?: number;
		min?: number;
		max?: number;
		decimals?: number;
		colspan?: number;
		rowspan?: number;
		id?: string;
	}[];
	positioning: 'HORIZONTAL';
};

export type ComponentLoopType = {
	componentType: 'Loop';
	loopDependencies: string[];
	lines: { min: LabelType; max: LabelType };
	components: ComponentType[];
	iterations: LabelType;
	maxPage: string;
	depth: number;
	paginatedLoop: boolean;
};

export type ComponentTableType = {
	componentType: 'Table';
	lines: ComponentRosterForLoopType['lines'];
	header: ComponentRosterForLoopType['header'];
	body: ComponentRosterForLoopType['body'];
	positioning: ComponentRosterForLoopType['positioning'];
};

export type ComponentNumberType = {
	componentType: 'InputNumber';
	unit: string;
	response: ResponseType;
	min?: number;
	max?: number;
	decimals?: number;
};

export type ComponentDatePickerType = {
	componentType: 'Datepicker';
	dateFormat: string;
	response: ResponseType;
	min?: string;
	max?: string;
};

export type ComponentCheckboxGroupType = {
	componentType: 'CheckboxGroup';
	responses: Array<{
		label: LabelType;
		response: ResponseType;
		id: string;
	}>;
};

export type ComponentCheckboxBooleanType = {
	componentType: 'CheckboxBoolean';
	response: ResponseType;
};

export type ComponentRadioType = {
	componentType: 'Radio';
	options: { value: string; label: LabelType }[];
	response: ResponseType;
};

export type ComponentDropdownType = {
	componentType: 'Dropdown';
	options: { value: string; label: LabelType }[];
	response: ResponseType;
};

export type ComponentSuggesterType = {
	componentType: 'Suggester';
	response?: ResponseType;
	responses?: Array<{ id: string; response: ResponseType }>;
	displayResponses: LabelType;
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
		[variableName: string]: Record<string, string>;
	};
};

export type ComponentComponentSet = {
	componentType: 'ComponentSet';
	components: ComponentType[];
};

export type SuggesterType = {
	name: string;
	fields: {
		name: string;
		min?: number;
		rules?: string[];
		language?: string;
		stemmer?: boolean;
		synonyms: { source: string; target: string[] }[];
	}[];
	max: number;
	stopWords?: string;
	order?: { field: string; type: string };
	queryParser: {
		type: string;
		params: { language: string; pattern: string; min?: number };
	};
	url?: string;
	version: number;
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
			bindingDependencies: string[];
			inFilter: string;
			shapeFrom?: string;
	  };

export type LunaticSource = {
	id: string;
	modele?: string;
	enoCoreVersion?: string;
	lunaticModelVersion?: string;
	generatingDate?: string;
	missing?: boolean;
	pagination?: boolean;
	maxPage: string;
	label: LabelType;
	components: ComponentType[];
	variables: Variable[];
	suggesters: SuggesterType[];
	cleaning: {
		[variableName: string]: {
			[variableName: string]: string;
		};
	};
	missingBlock: {
		[variableName: string]: string[];
	};
	resizing: {
		[variableName: string]: {
			size: string; // VTL Expression
			variables: string[];
		};
	};
};

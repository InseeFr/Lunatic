/**
 * Types used for source data (lunatic models and data.json)
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
	| 'ConfirmationModal'
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

export type ConditionFilterType = LabelType & {
	bindingDependencies?: string[];
};

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
	declarations?: DeclarationType[];
	conditionFilter: ConditionFilterType;
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
	| (ComponentTypeBase & ComponentCheckboxGroupType)
	| (ComponentTypeBase & ComponentCheckboxBooleanType)
	| (ComponentTypeBase & ComponentRadioType)
	| (ComponentTypeBase & ComponentFilterDescriptionType)
	| (ComponentTypeBase & ComponentDropdownType)
	| (ComponentTypeBase & ComponentPairWiseLinksType)
	| (ComponentTypeBase & ComponentRoundaboutType)
	| (ComponentTypeBase & ComponentSuggesterType)
	| (ComponentTypeBase & ComponentInputOrTextareaType)
	| (ComponentTypeBase & {
			componentType: 'CheckboxOne';
	  })
	| (ComponentTypeBase & {
			componentType: 'ConfirmationModal';
	  })
	| (ComponentTypeBase & ComponentComponentSetType)
	| (ComponentTypeBase & ComponentQuestionExplicationType);

export type ComponentInputOrTextareaType = {
	componentType: 'Input' | 'Textarea';
	maxLength: number;
	missingResponse?: ResponseType;
	response: ResponseType;
};

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
	body: ({ label: LabelType } | ComponentType)[][];
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
	header: ComponentRosterForLoopType['header'];
	body: ComponentRosterForLoopType['body'];
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
	dateFormat: 'YYYY-MM-DD' | 'YYYY' | 'YYYY-MM';
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
	missingResponse?: ResponseType;
};

export type ComponentRadioType = {
	componentType: 'Radio';
	options: { value: string; label: LabelType }[];
	response: ResponseType;
	missingResponse?: ResponseType;
};

export type ComponentDropdownType = {
	componentType: 'Dropdown';
	options: { value: string; label: LabelType }[];
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
		[variableName: string]: Record<string, string>;
	};
	components: ComponentType[];
};

export type ComponentComponentSetType = {
	componentType: 'ComponentSet';
	components: ComponentType[];
};

export type ComponentSuggesterType = {
	componentType: 'Suggester';
	storeName: string;
};

export type SuggesterType = {
	// Nom métier de la liste.
	name: string;
	// Champs à utiliser pour l'indexation
	fields: {
		// Nom de la propriété dans le JSON
		name: string;
		// Taille minimale des tokens à conserver pour l'indexation.
		min?: number;
		// Expressions régulières pour extraire les tokens (ex: ["[\\w]+"])
		rules?: string[];
		// Langue de référence pour la lemmatisation.
		language?: 'French' | 'English';
		// Active ou pas la lemmatisation.
		stemmer?: boolean;
		// Définit les mots synonymes
		synonyms: { source: string; target: string[] }[];
	}[];
	// Nombre de résultats à renvoyer lors d'une recherche
	max: number;
	// Liste des mots à ignorer.
	stopWords?: string;
	order?: { field: string; type: string };
	// Définit comment la recherche va être interprété
	queryParser:
		| {
				// Search is done word by word
				type: 'tokenized';
				params: {
					// Langue de référence pour la lemmatisation.
					language: 'French' | 'English';
					// Expressions régulières pour extraire les tokens (ex: ["[\\w]+"])
					pattern: string;
					// Taille minimale de la recherche
					min?: number;
				};
		  }
		| {
				type: 'soft';
		  };
	// Propriété pour créer un worker avec une api distante (pas utilisé actuellement)
	url?: string;
	// Version qui peut servir pour index db (pas utilisé actuellement)
	version: number;
	// Active la recherche de mots proches de la saisie (échos). Améliore le score des résultats si les mots sont proches.
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
	pagination?: 'question' | 'sequence' | 'subsequence';
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
	missingBlock: {
		[variableName: string]: string[];
	};
	resizing: {
		[variableName: string]:
			| {
					size: string; // VTL Expression
					variables: string[];
			  }
			| {
					sizeForLinksVariables: string[];
					linksVariables: string[];
			  };
	};
};

export type ComponentQuestionExplicationType = {
	componentType: 'QuestionExplication';
	description: string;
	bgColor?: string;
};

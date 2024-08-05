/* eslint-disable */
/**
 * This file was automatically generated by json-schema-to-typescript.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
 * and run json-schema-to-typescript to regenerate this file.
 */

export type ComponentDefinitionWithPage = ComponentDefinition &
	(
		| {
				page: string;
		  }
		| {
				goToPage: string;
		  }
	);
export type ComponentDefinition =
	| ComponentInputDefinition
	| ComponentSequenceDefinition
	| ComponentRoundaboutDefinition
	| ComponentLoopDefinition
	| ComponentRosterForLoopDefinition
	| ComponentTableDefinition
	| ComponentNumberDefinition
	| ComponentDurationDefinition
	| ComponentDatePickerDefinition
	| ComponentCheckboxGroupDefinition
	| ComponentCheckboxBooleanDefinition
	| ComponentRadioDefinition
	| ComponentDropdownDefinition
	| ComponentQuestionDefinition
	| ComponentCheckboxOneDefinition
	| ComponentSuggesterDefinition
	| ComponentPairWiseLinksDefinition
	| ComponentSummaryDefinition
	| ComponentText
	| ComponentAccordion;
export type ComponentInputDefinition = ComponentInputDefinition1 & {
	componentType: 'Input' | 'Textarea';
	maxLength?: number;
};
export type ComponentInputDefinition1 = ComponentDefinitionBaseWithResponse;
export type ComponentDefinitionBaseWithResponse = ComponentDefinitionBase & {
	response: ResponseDefinition;
};
export type ComponentSequenceDefinition = ComponentSequenceDefinition1 & {
	componentType: 'Sequence' | 'Subsequence';
	goToPage?: string;
};
export type ComponentSequenceDefinition1 = ComponentDefinitionBase;
export type ComponentRoundaboutDefinition = ComponentRoundaboutDefinition1 & {
	componentType: 'Roundabout';
	iterations: VTLScalarExpression;
	locked: boolean;
	progressVariable: string;
	item: {
		label: VTLScalarExpression;
		description?: VTLScalarExpression;
		disabled?: VTLScalarExpression;
	};
	components: ComponentDefinitionWithPage[];
};
export type ComponentRoundaboutDefinition1 = ComponentDefinitionBase;
export type ComponentLoopDefinition = {
	componentType: 'Loop';
	loopDependencies?: string[];
} & ComponentLoopDefinition1;
export type ComponentLoopDefinition1 = PaginatedLoop | BlockLoop;
export type PaginatedLoop = PaginatedLoop1 & {
	components: ComponentDefinitionWithPage[];
	iterations: VTLScalarExpression;
	maxPage: string;
	paginatedLoop: true;
};
export type PaginatedLoop1 = ComponentDefinitionBase;
export type BlockLoop = BlockLoop1 & {
	paginatedLoop: false;
	components: ComponentDefinition[];
} & BlockLoop2;
export type BlockLoop1 = ComponentDefinitionBase;
export type BlockLoop2 =
	| {
			lines: {
				min: VTLExpression;
				max: VTLExpression;
			};
	  }
	| {
			iterations: VTLExpression;
	  };
export type ComponentRosterForLoopDefinition =
	ComponentRosterForLoopDefinition1 & {
		componentType: 'RosterForLoop';
		components: ComponentDefinition[];
		lines: {
			min: VTLScalarExpression;
			max: VTLScalarExpression;
		};
		header?: TableHeader;
	};
export type ComponentRosterForLoopDefinition1 = ComponentDefinitionBase;
export type Options = {
	value: string | boolean;
	label: VTLExpression;
	description?: VTLExpression;
	conditionFilter?: VTLExpression;
}[];
export type TableHeader = {
	value?: string;
	label: VTLExpression;
	colspan?: number;
	rowspan?: number;
	options?: Options;
}[];
export type ComponentTableDefinition = ComponentTableDefinition1 & {
	componentType: 'Table';
	header?: TableHeader;
	body: (
		| ComponentDefinition
		| {
				label: VTLExpression;
		  }
	)[][];
};
export type ComponentTableDefinition1 = ComponentDefinitionBase;
export type ComponentNumberDefinition = ComponentNumberDefinition1 & {
	componentType: 'InputNumber';
	unit?: string | VTLExpression;
	min?: number;
	max?: number;
	decimals?: number;
};
export type ComponentNumberDefinition1 = ComponentDefinitionBaseWithResponse;
export type ComponentDurationDefinition = ComponentDurationDefinition1 & {
	componentType: 'Duration';
	format: 'PnYnM' | 'PTnHnM';
};
export type ComponentDurationDefinition1 = ComponentDefinitionBaseWithResponse;
export type ComponentDatePickerDefinition = ComponentDatePickerDefinition1 & {
	componentType: 'Datepicker';
	dateFormat: 'YYYY-MM-DD' | 'YYYY' | 'YYYY-MM';
	min?: string;
	max?: string;
};
export type ComponentDatePickerDefinition1 =
	ComponentDefinitionBaseWithResponse;
export type ComponentCheckboxGroupDefinition =
	ComponentCheckboxGroupDefinition1 & {
		componentType: 'CheckboxGroup';
		orientation?: 'horizontal' | 'vertical';
		responses: {
			label: VTLExpression;
			description?: VTLExpression;
			response: ResponseDefinition;
			conditionFilter?: VTLExpression;
			id: string;
			detail?: {
				label?: VTLExpression;
				response: ResponseDefinition;
			};
		}[];
	};
export type ComponentCheckboxGroupDefinition1 = ComponentDefinitionBase;
export type ComponentCheckboxBooleanDefinition =
	ComponentCheckboxBooleanDefinition1 & {
		componentType: 'CheckboxBoolean';
	};
export type ComponentCheckboxBooleanDefinition1 =
	ComponentDefinitionBaseWithResponse;
export type ComponentRadioDefinition = ComponentRadioDefinition1 & {
	componentType: 'Radio';
	orientation?: 'horizontal' | 'vertical';
	options: OptionsWithDetail;
};
export type ComponentRadioDefinition1 = ComponentDefinitionBaseWithResponse;
export type OptionsWithDetail = {
	value: string | boolean;
	label: VTLExpression;
	description?: VTLExpression;
	detail?: {
		label: VTLExpression;
		response: {
			name: string;
		};
	};
}[];
export type ComponentDropdownDefinition = ComponentDropdownDefinition1 & {
	componentType: 'Dropdown';
	options: Options;
};
export type ComponentDropdownDefinition1 = ComponentDefinitionBaseWithResponse;
export type ComponentQuestionDefinition = ComponentQuestionDefinition1 & {
	componentType: 'Question';
	components: ComponentDefinition[];
};
export type ComponentQuestionDefinition1 = ComponentDefinitionBase;
export type ComponentCheckboxOneDefinition = ComponentCheckboxOneDefinition1 & {
	componentType: 'CheckboxOne';
	options: OptionsWithDetail;
};
export type ComponentCheckboxOneDefinition1 =
	ComponentDefinitionBaseWithResponse;
export type ComponentSuggesterDefinition = ComponentSuggesterDefinition1 & {
	componentType: 'Suggester';
	/**
	 * Nom / Index du référentiel à utiliser
	 */
	storeName: string;
	/**
	 * Permet l'entrée d'une valeur arbitraire (Autre)
	 */
	arbitrary?: {
		response: ResponseDefinition;
	};
	/**
	 * Liste des attributs de la nomenclature à sauvegarder dans une variable
	 */
	optionResponses?: {
		/**
		 * Nom de la variable
		 */
		name: string;
		/**
		 * Nom de la propriété dans la nomenclature
		 */
		attribute: string;
	}[];
};
export type ComponentSuggesterDefinition1 = ComponentDefinitionBaseWithResponse;
export type ComponentPairWiseLinksDefinition =
	ComponentPairWiseLinksDefinition1 & {
		componentType: 'PairwiseLinks';
		xAxisIterations: VTLScalarExpression;
		yAxisIterations: VTLScalarExpression;
		symLinks: {
			[k: string]: {
				[k: string]: string | null;
			};
		};
		components: ComponentDefinition[];
	};
export type ComponentPairWiseLinksDefinition1 = ComponentDefinitionBase;
export type ComponentSummaryDefinition = ComponentSummaryDefinition1 & {
	componentType: 'Summary';
	sections: {
		id: string;
		iterations?: VTLExpression;
		title: VTLExpression;
		responses: {
			id: string;
			label: VTLExpression;
			value: VTLExpression;
		}[];
	}[];
};
export type ComponentSummaryDefinition1 = ComponentDefinitionBase;
export type Variable =
	| {
			variableType: 'EXTERNAL';
			name: string;
			value: VariableValue;
	  }
	| {
			variableType: 'COLLECTED';
			name: string;
			values?: {
				PREVIOUS: VariableValue;
				COLLECTED: VariableValue;
				FORCED: VariableValue;
				EDITED: VariableValue;
				INPUTTED: VariableValue;
			};
	  }
	| {
			variableType: 'CALCULATED';
			name: string;
			expression: VTLExpression;
			bindingDependencies?: string[];
			shapeFrom?: string[] | string;
	  };
export type VariableValue = VariableScalarValue | unknown[];
export type VariableScalarValue = string | number | null;

/**
 * A lunatic survey unit
 */
export type LunaticSource = {
	label?: VTLExpression;
	pagination?: 'question' | 'sequence';
	enoCoreVersion?: string;
	lunaticModelVersion?: string;
	generatingDate?: string;
	modele?: string;
	id?: string;
	components: ComponentDefinitionWithPage[];
	variables: Variable[];
	suggesters?: SuggesterDefinition[];
	cleaning?: {
		[k: string]: {
			[k: string]: string;
		};
	};
	missingBlock?: {
		[k: string]: string[];
	};
	resizing?: {
		[k: string]:
			| {
					/**
					 * VTL Expression for size.
					 */
					size: string;
					variables: string[];
			  }
			| {
					sizeForLinksVariables:
						| [string, string]
						| {
								xAxisSize: string;
								yAxisSize: string;
						  };
					linksVariables: string[];
			  }
			| {
					/**
					 * VTL Expression for size.
					 */
					size: string;
					variables: string[];
					sizeForLinksVariables:
						| [string, string]
						| {
								xAxisSize: string;
								yAxisSize: string;
						  };
					linksVariables: string[];
			  };
	};
	maxPage?: string;
	fillers?: FillerDefinition[];
};
export type VTLExpression = {
	/**
	 * Valid VTL Expression
	 */
	value: string;
	/**
	 * Variables used in the expression
	 */
	bindingDependencies?: string[];
	type: 'VTL' | 'VTL|MD' | 'TXT';
};
export type ComponentDefinitionBase = {
	label?: VTLExpression;
	description?: VTLExpression;
	declarations?: Declaration[];
	conditionFilter?: VTLScalarExpression;
	controls?: ControlDefinition[];
	id: string;
	mandatory?: boolean;
	missingResponse?: ResponseDefinition;
};
export type Declaration = {
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
	label: VTLExpression;
};
export type VTLScalarExpression = {
	/**
	 * Valid VTL Expression
	 */
	value: string;
	/**
	 * Variables used in the expression
	 */
	bindingDependencies?: string[];
	type: 'VTL';
};
export type ControlDefinition = {
	id: string;
	criticality: 'INFO' | 'WARN' | 'ERROR';
	typeOfControl?: 'FORMAT' | 'CONSISTENCY';
	control: VTLExpression;
	errorMessage: VTLExpression;
	bindingDependencies?: string[];
	type?: 'roundabout' | 'ROW' | 'simple';
	iterations?: VTLScalarExpression;
};
export type ResponseDefinition = {
	name: string;
};
export type ComponentText = {
	componentType: 'Text';
	label: VTLExpression;
};
export type ComponentAccordion = {
	componentType: 'Accordion';
	items: {
		label: VTLExpression;
		body: VTLExpression;
	}[];
};
export type SuggesterDefinition = {
	/**
	 * Name of the list (will be used as storeName for suggester)
	 */
	name: string;
	/**
	 * Fields to use for indexing the data
	 */
	fields: {
		/**
		 * Property name in the JSON
		 */
		name: string;
		/**
		 * Minimum length for a token to be indexed
		 */
		min?: number;
		/**
		 * Regular expression to match words (ex: ["[\\w]+"])
		 */
		rules?: 'soft' | string[];
		synonyms?: {
			[k: string]: string[];
		};
	}[];
	/**
	 * Limit the number of results to return
	 */
	max?: number;
	queryParser:
		| {
				/**
				 * Search type: word by word search using OR operator.
				 */
				type: 'tokenized';
				/**
				 * Parameters for tokenized search.
				 */
				params: {
					/**
					 * Language used for stemming (keeping the root of a word).
					 */
					language: 'French' | 'English';
					/**
					 * Regular expression pattern to match words.
					 */
					pattern: string;
					/**
					 * Minimum length for a token to be used in the search.
					 */
					min?: number;
				};
		  }
		| {
				type: 'soft';
		  };
};
export type FillerDefinition = {
	endpoint: {
		url: string;
		type?: 'VTL' | 'TXT';
	};
	responses: {
		name: string;
	}[];
};

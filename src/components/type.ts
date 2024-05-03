import type { CSSProperties, FunctionComponent, ReactNode } from 'react';
import useLunatic from '../use-lunatic';
import type {
	LunaticChangesHandler,
	LunaticComponentDefinition,
	LunaticError,
	LunaticOptions,
	LunaticReducerState,
} from '../use-lunatic/type';

type Formats = 'PTnHnM' | 'PnYnM';
export type VtlExpression = {
	value: string;
	type: 'VTL' | 'VTL|MD' | 'TXT';
};

export type LunaticBaseProps<ValueType = unknown> = {
	id: string;
	handleChanges: LunaticChangesHandler;
	errors?: { [id: string]: LunaticError[] };
	preferences?: LunaticOptions['preferences'];
	label?: ReactNode;
	disabled?: boolean;
	missing?: unknown;
	missingResponse?: { name: string; value?: unknown };
	management?: LunaticOptions['management'];
	description?: ReactNode;
	shortcut?: boolean;
	required?: boolean;
	value: null | ValueType;
	readOnly?: boolean;
	className?: string;
	style?: CSSProperties;
	iteration?: number;
	declarations?: {
		id: string;
		declarationType:
			| 'INSTRUCTION'
			| 'COMMENT'
			| 'HELP'
			| 'CODECARD'
			| 'WARNING'
			| 'STATEMENT';
		position: string;
		label: ReactNode;
	}[];
	features?: string[];
	goNextPage?: () => void;
	goPreviousPage?: () => void;
};

export type SuggesterOption = {
	children?: string[];
	id?: string;
	description?: ReactNode;
	label?: ReactNode;
	value: string;
	niveau?: string;
	parent?: string;
	tokensMap?: Record<string, { count: number; fields: string[] }>;
};

export type ComponentPropsByType = {
	InputNumber: LunaticBaseProps<number | null> & {
		min?: number;
		max?: number;
		decimals?: number;
		unit?: string;
		response: { name: string };
		componentType?: 'InputNumber';
	};
	Duration: LunaticBaseProps<string | null> & {
		format: Formats;
		response: { name: string };
		componentType?: 'Duration';
	};
	Text: LunaticBaseProps<string> & {
		componentType?: 'Text';
	};
	Input: LunaticBaseProps<string> & {
		maxLength?: number;
		value: null | string;
		response: { name: string };
		componentType?: 'Input';
	};
	Sequence: Pick<
		LunaticBaseProps<string>,
		'id' | 'label' | 'style' | 'declarations' | 'description'
	> & { componentType?: 'Sequence' };
	Subsequence: Pick<
		LunaticBaseProps<string>,
		'id' | 'label' | 'declarations' | 'description'
	> & { componentType?: 'Subsequence' };
	Question: Pick<
		LunaticBaseProps<unknown>,
		'label' | 'id' | 'description' | 'declarations'
	> & {
		components: LunaticComponentProps[];
		componentType?: 'Question';
	};
	RosterForLoop: LunaticBaseProps<unknown> & {
		lines: { min: number; max: number };
		iterations: number;
		getComponents: (n: number) => LunaticComponentProps[];
		executeExpression: LunaticReducerState['executeExpression'];
		value: Record<string, unknown[]>;
		header?: Array<{
			label: ReactNode;
			rowspan?: number;
			colspan?: number;
		}>;
		paginatedLoop?: boolean;
		componentType?: 'RosterForLoop';
	};
	Loop: LunaticBaseProps<unknown> & {
		lines: { min: number; max: number };
		iterations: number;
		getComponents: (n: number) => LunaticComponentProps[];
		executeExpression: LunaticReducerState['executeExpression'];
		value: Record<string, unknown[]>;
		header?: Array<{ label: ReactNode }>;
		paginatedLoop?: boolean;
		componentType?: 'Loop';
	};
	Table: LunaticBaseProps<unknown> & {
		value: Record<string, unknown>;
		header: Array<{
			label: ReactNode;
			rowspan?: number;
			colspan?: number;
		}>;
		body: (LunaticComponentProps & {
			colspan?: number;
			rowspan?: number;
		})[][];
		executeExpression: LunaticReducerState['executeExpression'];
		iteration: LunaticReducerState['pager']['iteration'];
		componentType?: 'Table';
	};
	Datepicker: LunaticBaseProps<string | null> & {
		dateFormat: 'YYYY-MM-DD' | 'YYYY-MM' | 'YYYY';
		min?: string;
		max?: string;
		response: { name: string };
		componentType?: 'Datepicker';
	};
	CheckboxGroup: LunaticBaseProps<Record<string, boolean | null>> & {
		responses: Array<{
			id: string;
			label: ReactNode;
			description?: ReactNode;
			response: { name: string };
		}>;
		componentType?: 'CheckboxGroup';
	};
	CheckboxOne: LunaticBaseProps<string | null> & {
		options: Array<{
			description?: ReactNode;
			label: ReactNode;
			value: string;
		}>;
		response: { name: string };
		componentType?: 'CheckboxOne';
	};
	Switch: LunaticBaseProps<boolean> & {
		response: { name: string };
		statusLabel?: { true: string; false: string };
		componentType?: 'Switch';
	};
	CheckboxBoolean: LunaticBaseProps<boolean> & {
		response: { name: string };
		componentType?: 'CheckboxBoolean';
	};
	Radio: LunaticBaseProps<string | null> & {
		options: Array<{ description: ReactNode; label: ReactNode; value: string }>;
		checkboxStyle?: boolean;
		response: { name: string };
		componentType?: 'Radio';
	};
	Roundabout: LunaticBaseProps<string> & {
		iterations: number;
		goToPage: ReturnType<typeof useLunatic>['goToPage'];
		page: number;
		locked?: boolean;
		expressions: {
			unnecessary?: Array<boolean>;
			complete?: Array<boolean>;
			partial?: Array<boolean>;
			label?: Array<string>;
		};
		componentType?: 'Roundabout';
	};
	Dropdown: LunaticBaseProps<string | null> & {
		options: Array<{ description: ReactNode; label: ReactNode; value: string }>;
		response: { name: string };
		componentType?: 'Dropdown';
	};
	Textarea: LunaticBaseProps<string> & {
		cols?: number;
		placeHolder?: string;
		maxLength?: number;
		rows?: number;
		response: { name: string };
		componentType?: 'Textarea';
	};
	FilterDescription: Pick<LunaticBaseProps<string>, 'id' | 'label'> & {
		componentType?: 'FilterDescription';
	};
	PairwiseLinks: Omit<LunaticBaseProps, 'value'> & {
		components: LunaticComponentDefinition[];
		features?: LunaticOptions['features'];
		executeExpression: LunaticReducerState['executeExpression'];
		xAxisIterations: number;
		yAxisIterations: number;
		symLinks: Record<string, Record<string, string>>;
		value: Record<string, unknown[]>;
		getComponents: (x: number, y: number) => LunaticComponentProps[];
		componentType?: 'PairwiseLinks';
	};
	Suggester: LunaticBaseProps<string | null> & {
		componentType?: 'Suggester';
		storeName: string;
		optionRenderer: FunctionComponent<{
			option: SuggesterOption;
			placeholder?: string;
			search?: string;
		}>;
		labelRenderer: FunctionComponent<{
			option?: SuggesterOption;
			selected?: boolean;
			search?: string;
		}>;
		focused: boolean;
		response: { name: string };
		optionResponses?: { name: string; attribute: string }[];
		arbitrary?: {
			response: { name: string };
		};
		arbitraryValue?: string;
		allowArbitrary?: boolean;
		executeExpression: LunaticReducerState['executeExpression'];
		iteration: LunaticReducerState['pager']['iteration'];
	};
	Summary: LunaticBaseProps<string | null> & {
		componentType?: 'Summary';
		executeExpression: LunaticReducerState['executeExpression'];
		sections: Array<{
			id: string;
			responses?: Array<{
				id: string;
				label: VtlExpression;
				value: VtlExpression;
			}>;
			title?: VtlExpression;
			iterations?: VtlExpression;
		}>;
	};
};

export type LunaticComponentType = keyof ComponentPropsByType;

export type LunaticComponentProps<
	T extends LunaticComponentType = LunaticComponentType,
> = ComponentPropsByType[T];

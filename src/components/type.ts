import type { CSSProperties, FunctionComponent, ReactNode } from 'react';
import useLunatic from '../use-lunatic';
import type { FilledLunaticComponentProps } from '../use-lunatic/commons/fill-components/fill-components';
import type {
	LunaticComponentDefinition,
	LunaticError,
	LunaticState,
} from '../use-lunatic/type';
import { SuggesterStatus } from '../use-lunatic/use-suggesters';

type Formats = 'PTnHnM' | 'PnYnM';
export type VtlExpression = {
	value: string;
	type: 'VTL' | 'VTL|MD';
};

export type LunaticBaseProps<ValueType = unknown> = {
	id: string;
	handleChange: (
		response: { name: string },
		value: ValueType,
		args?: Record<string, unknown>
	) => void;
	errors?: { [id: string]: LunaticError[] };
	preferences?: LunaticState['preferences'];
	label?: ReactNode;
	disabled?: boolean;
	missing?: unknown;
	missingResponse?: { name: string; value?: unknown };
	management?: LunaticState['management'];
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
	componentType?: string;
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

type ComponentPropsByType = {
	InputNumber: LunaticBaseProps<number | null> & {
		min?: number;
		max?: number;
		decimals?: number;
		unit?: string;
		response: { name: string };
	};
	Duration: LunaticBaseProps<string | null> & {
		format: Formats;
		response: { name: string };
	};
	Input: LunaticBaseProps<string> & {
		maxLength?: number;
		value: null | string;
		response: { name: string };
	};
	Sequence: Pick<
		LunaticBaseProps<string>,
		'id' | 'label' | 'style' | 'declarations' | 'description'
	>;
	Subsequence: Pick<LunaticBaseProps<string>, 'id' | 'label' | 'declarations'>;
	Question: Pick<
		LunaticBaseProps<unknown>,
		'label' | 'id' | 'description' | 'declarations'
	> & {
		components: FilledLunaticComponentProps[];
	};
	RosterForLoop: LunaticBaseProps<unknown> & {
		lines: { min: number; max: number };
		iterations: number;
		getComponents: (n: number) => FilledLunaticComponentProps[];
		executeExpression: LunaticState['executeExpression'];
		value: Record<string, unknown[]>;
		header?: Array<{
			label: ReactNode;
			rowspan?: number;
			colspan?: number;
		}>;
		paginatedLoop?: boolean;
	};
	Loop: LunaticBaseProps<unknown> & {
		lines: { min: number; max: number };
		iterations: number;
		getComponents: (n: number) => FilledLunaticComponentProps[];
		executeExpression: LunaticState['executeExpression'];
		value: Record<string, unknown[]>;
		header?: Array<{ label: ReactNode }>;
		paginatedLoop?: boolean;
	};
	Table: LunaticBaseProps<unknown> & {
		value: Record<string, unknown>;
		header: Array<{
			label: ReactNode;
			rowspan?: number;
			colspan?: number;
		}>;
		body: (FilledLunaticComponentProps & {
			colspan?: number;
			rowspan?: number;
		})[][];
		executeExpression: LunaticState['executeExpression'];
		iteration: LunaticState['pager']['iteration'];
	};
	Datepicker: LunaticBaseProps<string | null> & {
		dateFormat: 'YYYY-MM-DD' | 'YYYY-MM' | 'YYYY';
		min?: string;
		max?: string;
		response: { name: string };
	};
	CheckboxGroup: LunaticBaseProps<Record<string, boolean | null>> & {
		responses: Array<{
			id: string;
			label: ReactNode;
			description?: ReactNode;
			response: { name: string };
		}>;
		handleChange: (
			response: { name: string },
			value: boolean,
			args?: Record<string, unknown>
		) => void;
	};
	CheckboxOne: LunaticBaseProps<string | null> & {
		options: Array<{
			description?: ReactNode;
			label: ReactNode;
			value: string;
		}>;
		response: { name: string };
	};
	Switch: LunaticBaseProps<boolean> & {
		response: { name: string };
		statusLabel?: { true: string; false: string };
	};
	CheckboxBoolean: LunaticBaseProps<boolean> & {
		response: { name: string };
	};
	Radio: LunaticBaseProps<string | null> & {
		options: Array<{ description: ReactNode; label: ReactNode; value: string }>;
		checkboxStyle?: boolean;
		response: { name: string };
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
	};
	Dropdown: LunaticBaseProps<string | null> & {
		options: Array<{ description: ReactNode; label: ReactNode; value: string }>;
		response: { name: string };
	};
	Textarea: LunaticBaseProps<string> & {
		cols?: number;
		placeHolder?: string;
		maxLength?: number;
		rows?: number;
		response: { name: string };
	};
	FilterDescription: Pick<LunaticBaseProps<string>, 'id' | 'label'>;
	PairwiseLinks: Omit<LunaticBaseProps, 'value'> & {
		components: LunaticComponentDefinition[];
		features?: LunaticState['features'];
		executeExpression: LunaticState['executeExpression'];
		xAxisIterations: number;
		yAxisIterations: number;
		symLinks: Record<string, Record<string, string>>;
		value: Record<string, unknown[]>;
		getComponents: (x: number, y: number) => FilledLunaticComponentProps[];
	};
	Suggester: LunaticBaseProps<string | null> & {
		storeName: string;
		workersBasePath?: string;
		getSuggesterStatus: (name: string) => {
			status: SuggesterStatus;
			timestamp: number;
		};
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
		idbVersion?: string;
		focused: boolean;
		response: { name: string };
		optionResponses?: { name: string; attribute: string }[];
		arbitrary: {
			response: { name: string };
			label: string;
			inputLabel: ReactNode;
		};
		executeExpression: LunaticState['executeExpression'];
		iteration: LunaticState['pager']['iteration'];
	};
	Summary: LunaticBaseProps<string | null> & {
		executeExpression: LunaticState['executeExpression'];
		sections: Array<{
			id: string;
			responses?: Array<{
				id: string;
				label: VtlExpression;
				value: VtlExpression;
			}>;
			title?: VtlExpression;
			iterations?: number;
		}>;
	};
};

export type LunaticComponentType = keyof ComponentPropsByType;

export type LunaticComponentProps<
	T extends LunaticComponentType = LunaticComponentType,
> = ComponentPropsByType[T];

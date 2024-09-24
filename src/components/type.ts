import type { CSSProperties, FunctionComponent, ReactNode } from 'react';
import { useLunatic } from '../use-lunatic/use-lunatic';
import type {
	LunaticChangesHandler,
	LunaticComponentDefinition,
	LunaticError,
	LunaticOptions,
	LunaticReducerState,
} from '../use-lunatic/type';
import type { InterpretedOption } from '../use-lunatic/props/propOptions';

type Formats = 'PTnHnM' | 'PnYnM';
export type VtlExpression = {
	value: string;
	type: 'VTL' | 'VTL|MD' | 'TXT';
};

export interface LunaticExtraProps {}

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
	meta?: Record<string, unknown>;
	// Function used by the wrapper to transform props, can be used to pass transformation through component (Loop, Question...)
	propsTransformer?: (v: any) => any;
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
	InputNumber: LunaticBaseProps<number | null> &
		LunaticExtraProps & {
			min?: number;
			max?: number;
			decimals?: number;
			unit?: string;
			response: { name: string };
			componentType?: 'InputNumber';
		};
	Duration: LunaticBaseProps<string | null> &
		LunaticExtraProps & {
			format: Formats;
			response: { name: string };
			componentType?: 'Duration';
		};
	Text: LunaticBaseProps<string> &
		LunaticExtraProps & {
			componentType?: 'Text';
		};
	Input: LunaticBaseProps<string> &
		LunaticExtraProps & {
			maxLength?: number;
			value: null | string;
			response: { name: string };
			componentType?: 'Input';
		};
	Accordion: LunaticBaseProps<string> &
		LunaticExtraProps & {
			componentType?: 'Accordion';
			items: {
				label: ReactNode;
				body: ReactNode;
			}[];
		};
	Sequence: Pick<
		LunaticBaseProps<string>,
		'id' | 'label' | 'style' | 'declarations' | 'description'
	> &
		LunaticExtraProps & { componentType?: 'Sequence' };
	Subsequence: Pick<
		LunaticBaseProps<string>,
		'id' | 'label' | 'declarations' | 'description'
	> &
		LunaticExtraProps & { componentType?: 'Subsequence' };
	Question: Pick<
		LunaticBaseProps<unknown>,
		| 'propsTransformer'
		| 'label'
		| 'id'
		| 'description'
		| 'declarations'
		| 'errors'
		| 'disabled'
		| 'readOnly'
	> &
		LunaticExtraProps & {
			components: LunaticComponentProps[];
			componentType?: 'Question';
			iteration?: number;
		};
	RosterForLoop: LunaticBaseProps<unknown> &
		LunaticExtraProps & {
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
	Loop: LunaticBaseProps<unknown> &
		LunaticExtraProps & {
			lines: { min: number; max: number };
			iterations: number;
			getComponents: (n: number) => LunaticComponentProps[];
			executeExpression: LunaticReducerState['executeExpression'];
			value: Record<string, unknown[]>;
			header?: Array<{ label: ReactNode }>;
			paginatedLoop?: boolean;
			componentType?: 'Loop';
		};
	Table: LunaticBaseProps<unknown> &
		LunaticExtraProps & {
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
	Datepicker: LunaticBaseProps<string | null> &
		LunaticExtraProps & {
			dateFormat: 'YYYY-MM-DD' | 'YYYY-MM' | 'YYYY';
			min?: string;
			max?: string;
			response: { name: string };
			componentType?: 'Datepicker';
		};
	CheckboxGroup: LunaticBaseProps<Record<string, boolean | null>> &
		LunaticExtraProps & {
			options: {
				id: string;
				label: ReactNode;
				name: string;
				checked: boolean;
				description?: ReactNode;
				onCheck: (b: boolean) => void;
				onDetailChange?: (v: string) => void;
				detailValue?: string | null;
				detailLabel?: ReactNode;
			}[];
			orientation?: 'horizontal' | 'vertical';
			componentType?: 'CheckboxGroup';
		};
	CheckboxOne: LunaticBaseProps<string | null> &
		LunaticExtraProps & {
			options: Array<InterpretedOption>;
			componentType?: 'CheckboxOne';
			orientation?: 'horizontal' | 'vertical';
		};
	Switch: LunaticBaseProps<boolean> &
		LunaticExtraProps & {
			response: { name: string };
			statusLabel?: { true: string; false: string };
			componentType?: 'Switch';
		};
	CheckboxBoolean: LunaticBaseProps<boolean> &
		LunaticExtraProps & {
			response: { name: string };
			componentType?: 'CheckboxBoolean';
		};
	Radio: LunaticBaseProps<string | null> &
		LunaticExtraProps & {
			options: Array<InterpretedOption>;
			checkboxStyle?: boolean;
			response: { name: string };
			componentType?: 'Radio';
			orientation?: 'horizontal' | 'vertical';
		};
	Roundabout: LunaticBaseProps<string> &
		LunaticExtraProps & {
			iterations: number;
			goToPage: ReturnType<typeof useLunatic>['goToPage'];
			page: number;
			progressVariable: string;
			locked: boolean;
			items: {
				label?: ReactNode;
				progress: number; // -1: not completed, 0: started, 1: finished
				description?: ReactNode;
				disabled?: boolean;
			}[];
			componentType?: 'Roundabout';
		};
	Dropdown: LunaticBaseProps<string | null> &
		LunaticExtraProps & {
			options: Array<{
				description?: ReactNode;
				label: ReactNode;
				value: string;
			}>;
			response: { name: string };
			componentType?: 'Dropdown';
		};
	Textarea: LunaticBaseProps<string> &
		LunaticExtraProps & {
			cols?: number;
			placeHolder?: string;
			maxLength?: number;
			rows?: number;
			response: { name: string };
			componentType?: 'Textarea';
		};
	FilterDescription: Pick<LunaticBaseProps<string>, 'id' | 'label'> &
		LunaticExtraProps & {
			componentType?: 'FilterDescription';
		};
	PairwiseLinks: Omit<LunaticBaseProps, 'value'> &
		LunaticExtraProps & {
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
	Suggester: LunaticBaseProps<string | null> &
		LunaticExtraProps & {
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
	Summary: LunaticBaseProps<string | null> &
		LunaticExtraProps & {
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

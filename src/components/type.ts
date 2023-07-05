import {
	LunaticComponentDefinition,
	LunaticError,
	LunaticExpression,
	LunaticState,
} from '../use-lunatic/type';
import { CSSProperties, FunctionComponent, ReactNode } from 'react';
import { SuggesterStatus } from '../use-lunatic/use-suggesters';
import useLunatic from '../use-lunatic';

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
	declarations?: {
		id: string;
		declarationType: string;
		position: string;
		label: ReactNode;
	}[];
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
	executeExpression: LunaticState['executeExpression'];
	features?: string[];
	componentType?: string;
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
		min: number;
		max: number;
		decimals: number;
		unit?: string;
		response: { name: string };
	};
	Input: LunaticBaseProps<string> & {
		maxLength?: number;
		value: null | string;
		response: { name: string };
	};
	Sequence: Pick<
		LunaticBaseProps<string>,
		'id' | 'declarations' | 'label' | 'style'
	>;
	Subsequence: Pick<LunaticBaseProps<string>, 'id' | 'declarations' | 'label'>;
	Question: Pick<LunaticBaseProps<unknown>, 'label' | 'description'>;
	ComponentSet: LunaticBaseProps<unknown> & {
		components: LunaticComponentDefinition[];
		value: Record<string, unknown>;
		response: undefined;
	};
	RosterForLoop: LunaticBaseProps<unknown> & {
		lines: { min: number; max: number };
		iterations?: number;
		components: LunaticComponentDefinition[];
		executeExpression: LunaticState['executeExpression'];
		value: Record<string, unknown[]>;
		headers?: Array<{ label: ReactNode }>;
		paginatedLoop?: boolean;
	};
	Loop: LunaticBaseProps<unknown> & {
		lines: { min: number; max: number };
		iterations?: number;
		components: LunaticComponentDefinition[];
		executeExpression: LunaticState['executeExpression'];
		value: Record<string, unknown[]>;
		headers?: Array<{ label: ReactNode }>;
		paginatedLoop?: boolean;
	};
	Table: LunaticBaseProps<unknown> & {
		value: Record<string, unknown>;
		header: Array<{
			label: ReactNode;
			rowspan?: number;
			colspan?: number;
		}>;
		body: Array<Array<{ label: LunaticExpression }>>;
		executeExpression: LunaticState['executeExpression'];
		iteration: LunaticState['pager']['iteration'];
	};
	Datepicker: LunaticBaseProps<string | null> & {
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
			description: ReactNode;
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
		options: Array<{ description: ReactNode; label: ReactNode; value: string }>;
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
		page: string;
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
		writable?: boolean;
	};
	Textarea: LunaticBaseProps<string> & {
		cols?: number;
		placeHolder?: string;
		maxLength?: number;
		rows?: number;
		response: { name: string };
	};
	FilterDescription: Pick<LunaticBaseProps<string>, 'id' | 'label'>;
	Accordion: Pick<LunaticBaseProps<string>, 'id' | 'label' | 'description'> & { bgColor?: string };
	PairwiseLinks: Omit<LunaticBaseProps, 'value'> & {
		components: LunaticComponentDefinition[];
		features?: LunaticState['features'];
		executeExpression: LunaticState['executeExpression'];
		xAxisIterations: number;
		yAxisIterations: number;
		symLinks: Record<string, Record<string, string>>;
		value: Record<string, unknown[]>;
	};
	Suggester: LunaticBaseProps<string | null> & {
		storeName: string;
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
	};
	Summary: LunaticBaseProps<string | null> & {
		sections: Array<{
			responses?: Array<{ label: VtlExpression; value: VtlExpression }>;
			title?: VtlExpression;
			iterations?: number;
		}>
	};
};

export type LunaticComponentType = keyof ComponentPropsByType;

export type LunaticComponentProps<
	T extends LunaticComponentType = LunaticComponentType
> = ComponentPropsByType[T];

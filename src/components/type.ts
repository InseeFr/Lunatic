import {
	LunaticComponentDefinition,
	LunaticError,
	LunaticExpression,
	LunaticState,
} from '../use-lunatic/type';
import { CSSProperties, FunctionComponent, ReactNode } from 'react';

export type LunaticBaseProps<ValueType = unknown> = {
	id: string;
	handleChange: (
		response: { name: string },
		value: ValueType,
		args?: Record<string, unknown>
	) => void;
	errors?: { [id: string]: LunaticError[] };
	preferences: LunaticState['preferences'];
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
	description?:
		| ReactNode
		| {
				label: ReactNode;
				declarationType: string;
		  }[];
	shortcut?: boolean;
	required?: boolean;
	value: null | ValueType;
	readOnly?: boolean;
	className?: string;
	style?: CSSProperties;
	iteration?: number;
	executeExpression: LunaticState['executeExpression'];
};

type SuggesterOption = {
	children?: string[];
	id: string;
	label: string;
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
	RosterForLoop: LunaticBaseProps<unknown> & {
		lines: { min: number; max: number };
		iterations?: number;
		components: LunaticComponentDefinition[];
		executeExpression: LunaticState['executeExpression'];
		value: Record<string, unknown[]>;
		componentType: 'RosterForLoop';
		headers?: Array<{ label: LunaticExpression }>;
		paginatedLoop?: boolean;
	};
	Loop: LunaticBaseProps<unknown> & {
		lines: { min: number; max: number };
		iterations?: number;
		components: LunaticComponentDefinition[];
		executeExpression: LunaticState['executeExpression'];
		value: Record<string, unknown[]>;
		componentType: 'Loop';
		headers?: Array<{ label: LunaticExpression }>;
		paginatedLoop?: boolean;
	};
	Table: LunaticBaseProps<unknown> & {
		header: Array<{
			label: LunaticExpression;
			rowspan?: number;
			colspan?: number;
		}>;
		body: Array<Array<{ label: LunaticExpression }>>;
		executeExpression: LunaticState['executeExpression'];
		iteration: LunaticState['pager']['iteration'];
	};
	Datepicker: LunaticBaseProps<string> & {
		min?: string;
		max?: string;
		value: null | string;
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
	Roundabout: LunaticBaseProps<string> & {};
	Dropdown: LunaticBaseProps<string> & {
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
	PairwiseLinks: LunaticBaseProps<string> & {
		components: LunaticComponentDefinition[];
		features?: LunaticState['features'];
		executeExpression: LunaticState['executeExpression'];
		xAxisIterations: number;
		yAxisIterations: number;
		symLinks: Record<string, Record<string, string>>;
		value: Record<string, unknown[]>;
	};
	Suggester: LunaticBaseProps<string> & {
		storeName: string;
		optionRendered: FunctionComponent<{
			option: SuggesterOption;
			placeholder?: string;
			search?: string;
		}>;
		labelRenderer: FunctionComponent<{
			option: SuggesterOption;
			selected?: boolean;
			search?: string;
		}>;
		idbVersion?: string;
		focused: boolean;
		response: { name: string };
	};
};

export type LunaticComponentProps<
	T extends keyof ComponentPropsByType = keyof ComponentPropsByType
> = ComponentPropsByType[T];

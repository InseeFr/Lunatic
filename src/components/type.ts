import {
	LunaticComponentDefinition,
	LunaticExpression,
	LunaticState,
} from '../use-lunatic/type';
import { CSSProperties, FunctionComponent, ReactNode } from 'react';

type SharedProps<ValueType> = {
	id: string;
	handleChange: (
		response: { name: string },
		value: ValueType,
		args: Record<string, unknown>
	) => void;
	errors?: LunaticState['errors'];
	preferences: LunaticState['preferences'];
	declarations?: {
		id: string;
		declarationType: string;
		position: string;
		label: ReactNode;
	}[];
	label: ReactNode;
	disabled?: boolean;
	missing?: unknown;
	missingResponse?: unknown;
	management?: LunaticState['management'];
	description?: ReactNode;
	shortcut?: boolean;
	required?: boolean;
	value: null | ValueType;
	readOnly?: boolean;
	className?: string;
	style?: CSSProperties;
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
	InputNumber: SharedProps<number> & {
		min: number;
		max: number;
		decimals: number;
		unit?: string;
		response: { name: string };
	};
	Input: SharedProps<string> & {
		maxLength?: number;
		value: null | string;
		response: { name: string };
	};
	Sequence: Pick<
		SharedProps<string>,
		'id' | 'declarations' | 'label' | 'style'
	>;
	Subsequence: Pick<SharedProps<string>, 'id' | 'declarations' | 'label'>;
	RosterForLoop: SharedProps<unknown> & {
		lines: { min: number; max: number };
		iterations?: number;
		components: LunaticComponentDefinition[];
		executeExpression: LunaticState['executeExpression'];
		value: Record<string, unknown[]>;
		componentType: 'RosterForLoop';
		headers?: Array<{ label: LunaticExpression }>;
		paginatedLoop?: boolean;
	};
	Loop: SharedProps<unknown> & {
		lines: { min: number; max: number };
		iterations?: number;
		components: LunaticComponentDefinition[];
		executeExpression: LunaticState['executeExpression'];
		value: Record<string, unknown[]>;
		componentType: 'Loop';
		headers?: Array<{ label: LunaticExpression }>;
		paginatedLoop?: boolean;
	};
	Table: SharedProps<unknown> & {
		header: Array<{
			label: LunaticExpression;
			rowspan?: number;
			colspan?: number;
		}>;
		body: Array<Array<{ label: LunaticExpression }>>;
		executeExpression: LunaticState['executeExpression'];
		iteration: LunaticState['pager']['iteration'];
	};
	Datepicker: SharedProps<string> & {
		min?: string;
		max?: string;
		value: null | string;
		response: { name: string };
	};
	CheckboxGroup: SharedProps<Record<string, boolean | null>> & {
		responses: Array<{
			id: string;
			label: ReactNode;
			response: { name: string };
		}>;
	};
	CheckboxOne: SharedProps<string> & {
		options: Array<{ description: ReactNode; label: ReactNode; value: string }>;
		response: { name: string };
	};
	CheckboxBoolean: SharedProps<string> & {
		options: Array<{ description: ReactNode; label: ReactNode; value: string }>;
		response: { name: string };
	};
	Radio: SharedProps<string> & {
		options: Array<{ description: ReactNode; label: ReactNode; value: string }>;
		checkboxStyle?: boolean;
		response: { name: string };
	};
	Dropdown: SharedProps<string> & {
		options: Array<{ description: ReactNode; label: ReactNode; value: string }>;
		response: { name: string };
	};
	Textarea: SharedProps<string> & {
		cols?: number;
		maxLength?: number;
		rows?: number;
		response: { name: string };
	};
	FilterDescription: Pick<SharedProps<string>, 'id' | 'label'>;
	PairwiseLinks: SharedProps<string> & {
		components: LunaticComponentDefinition[];
		features?: LunaticState['features'];
		executeExpression: LunaticState['executeExpression'];
		xAxisIterations: number;
		yAxisIterations: number;
		symLinks: Record<string, Record<string, string>>;
		value: Record<string, unknown[]>;
	};
	Suggester: SharedProps<string> & {
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

export type LunaticComponentProps<T extends keyof ComponentPropsByType> =
	ComponentPropsByType[T];

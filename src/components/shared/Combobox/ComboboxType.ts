import type { ComponentType, ReactNode } from 'react';

export type ComboboxOptionType = {
	id?: string;
	description?: ReactNode;
	label?: ReactNode;
	value: string;
	search?: string;
};

export type ComboboxSelectionProps = {
	expanded?: boolean;
	focused?: boolean;
	onChange?: (s: string | null) => void;
	editable?: boolean;
	labelId?: string;
	id?: string;
	classNamePrefix?: string;
	readOnly?: boolean;
	invalid?: boolean;
	/**
	 * @deprecated use createCustomizableField with ComboboxLabelRenderer as name.
	 */
	labelRenderer?: ComponentType<{
		option?: ComboboxOptionType;
		placeholder?: string;
		search?: string;
		disabled?: boolean;
	}>;
	placeholder?: string;
	selectedIndex?: number;
	options: Array<ComboboxOptionType>;
	search?: string;
	disabled?: boolean;
};

export type ComboboxPanelProps = {
	/**
	 * @deprecated use createCustomizableField with ComboboxOptionRenderer as name.
	 */
	optionRenderer?: ComponentType<{
		option: ComboboxOptionType;
		selected?: boolean;
		search?: string;
	}>;
	options: Array<ComboboxOptionType>;
	focused?: boolean;
	selectedIndex?: number | string | null;
	expanded?: boolean;
	id?: string;
	search?: string;
	onSelect: (value: string) => void;
};

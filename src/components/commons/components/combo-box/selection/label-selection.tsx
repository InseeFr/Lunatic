import React, { FunctionComponent } from 'react';
import ComboBoxLabelSelection from './combo-box-label-selection';
import { ComboBoxOptionType } from '../combo-box.type';

export type LabelSelectionProps = {
	/**
	 * @deprecated use createCustomizableField with ComboboxLabelRenderer as name.
	 */
	labelRenderer?: FunctionComponent<{
		option?: ComboBoxOptionType;
		placeholder?: string;
		search?: string;
		disabled?: boolean;
	}>;
	placeholder?: string;
	selectedIndex?: number;
	options: Array<ComboBoxOptionType>;
	search?: string;
	disabled?: boolean;
};

export function LabelSelection({
	labelRenderer: Renderer,
	placeholder,
	selectedIndex,
	options,
	search,
	disabled,
}: LabelSelectionProps) {
	const option =
		selectedIndex !== undefined ? options[selectedIndex] : undefined;
	const EffectifLabelSelection = Renderer ?? ComboBoxLabelSelection;

	return (
		<EffectifLabelSelection
			option={option}
			placeholder={placeholder}
			search={search}
			disabled={disabled}
		/>
	);
}

export default LabelSelection;

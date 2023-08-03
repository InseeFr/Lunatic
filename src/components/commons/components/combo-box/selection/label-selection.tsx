import React, { FunctionComponent } from 'react';
import LabelSelectionRenderer from '../../label-selection-renderer';
import { ComboBoxOption } from '../combo-box.type';

export type LabelSelectionProps = {
	/**
	 * @deprecated use createCustomizableField with ComboboxLabelRenderer as name.
	 */
	labelRenderer?: FunctionComponent<{
		option?: ComboBoxOption;
		placeholder?: string;
		search?: string;
		disabled?: boolean;
	}>;
	placeholder?: string;
	selectedIndex?: number;
	options: Array<ComboBoxOption>;
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
	const EffectifRenderer = Renderer ?? LabelSelectionRenderer;

	return (
		<EffectifRenderer
			option={option}
			placeholder={placeholder}
			search={search}
			disabled={disabled}
		/>
	);
}

export default LabelSelection;

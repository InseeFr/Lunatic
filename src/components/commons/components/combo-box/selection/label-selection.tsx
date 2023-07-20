import React, { FunctionComponent } from 'react';
import { displayLabelOrInput } from './displayLabelOrInput';
import { ComboBoxOption } from '../combo-box.type';
import LabelSelectionContainer from './label-selection-container';

export type LabelSelectionProps = {
	labelRenderer: FunctionComponent<{
		option?: ComboBoxOption;
		placeholder?: string;
		search?: string;
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

	return (
		<LabelSelectionContainer disabled={disabled}>
			<Renderer option={option} placeholder={placeholder} search={search} />
		</LabelSelectionContainer>
	);
}

export default displayLabelOrInput(LabelSelection, 'LabelSelection');

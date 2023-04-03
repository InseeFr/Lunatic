import React, { FunctionComponent } from 'react';
import classnames from 'classnames';
import { displayLabelOrInput } from './displayLabelOrInput';
import { ComboBoxOption } from '../combo-box.type';

export type LabelSelectionProps = {
	labelRenderer: FunctionComponent<{
		option: ComboBoxOption;
		placeholder?: string;
		search?: string;
	}>;
	placeholder?: string;
	selectedIndex?: number | string;
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
		<div
			className={classnames('lunatic-combo-box-selected', {
				disabled,
			})}
		>
			{option && (
				<Renderer option={option} placeholder={placeholder} search={search} />
			)}
		</div>
	);
}

export default displayLabelOrInput(LabelSelection, 'LabelSelection');

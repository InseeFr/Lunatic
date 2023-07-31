import React, { FunctionComponent } from 'react';
import classnames from 'classnames';
import { ComboBoxOption } from '../combo-box.type';
import createCustomizableLunaticField from '../../../create-customizable-field';

export type LabelSelectionProps = {
	/**
	 * @deprecated use createCustomizableField with ComboboxLabelRenderer as name.
	 */
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
		<div
			className={classnames('lunatic-combo-box-selected', {
				disabled,
			})}
		>
			<Renderer option={option} placeholder={placeholder} search={search} />
		</div>
	);
}

export default createCustomizableLunaticField(
	LabelSelection,
	'ComboboxLabelSelection'
);

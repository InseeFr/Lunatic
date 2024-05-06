import classnames from 'classnames';
import { ComboboxLabelSelection } from './ComboboxLabelSelection';
import { ComboboxInput } from './ComboboxInput';
import type { ComboboxSelectionProps } from '../ComboboxType';
import type { ChangeEvent } from 'react';

/**
 * Label displayed when a value is selected in the ComboBox
 * This label can either be an input (when editable or expanded) or a simple span
 */
export function ComboboxSelection({
	labelRenderer,
	placeholder,
	search,
	expanded,
	disabled,
	readOnly,
	focused,
	onChange,
	selectedIndex,
	options,
	editable,
	labelId,
	id,
	classNamePrefix,
	invalid,
}: ComboboxSelectionProps) {
	const showLabel = !editable || !expanded;
	const selectedOption =
		selectedIndex !== undefined ? options[selectedIndex] : undefined;
	const LabelSelectionComponent = labelRenderer ?? ComboboxLabelSelection;

	return (
		<div
			id={id}
			className={classnames(
				`${classNamePrefix ?? 'lunatic'}-combo-box-selection`,
				{
					focused,
					disabled,
				}
			)}
			role="combobox"
			aria-controls={'todo'}
			aria-haspopup="listbox"
			aria-expanded={expanded}
			aria-autocomplete="list"
			aria-owns={id}
			aria-labelledby={labelId}
		>
			{showLabel ? (
				<LabelSelectionComponent
					option={selectedOption}
					placeholder={placeholder}
					search={search}
					disabled={disabled}
					readOnly={readOnly}
				/>
			) : (
				<ComboboxInput
					invalid={invalid}
					id={`combobox-input-${id}`}
					className="lunatic-combo-box-input"
					onChange={(e: ChangeEvent<HTMLInputElement>) =>
						onChange?.(e.target.value)
					}
					value={search}
					placeholder={placeholder}
					disabled={disabled}
					readOnly={readOnly}
					focused={focused}
					labelledBy={labelId}
				/>
			)}
		</div>
	);
}

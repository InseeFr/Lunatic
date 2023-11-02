import { type ReactNode, useState } from 'react';
import classnames from 'classnames';
import { createCustomizableLunaticField, Label } from '../../commons';
import './checkbox-option.scss';
import KeyboardEventHandler from 'react-keyboard-event-handler';
import { CheckboxIcon } from '../../commons/icons/checkbox-icon';

export type CheckboxOptionProps = {
	id?: string;
	disabled?: boolean;
	// Keyboard shortcut that toggle the checkbox
	keyboardShortcut?: string;
	invalid?: boolean;
	label?: ReactNode;
	checked?: boolean;
	description?: ReactNode;
	onChange?: (v: boolean) => void;
	detailLabel?: ReactNode;
	onDetailChange?: (v: string | null) => void;
};

function CheckboxOption({
	disabled,
	checked,
	id,
	onChange,
	label,
	description,
	keyboardShortcut,
	invalid,
	detailLabel,
	onDetailChange,
}: CheckboxOptionProps) {
	const [focused, setFocused] = useState(false);
	const labelId = `label-${id}`;
	const hasDetail = !!onDetailChange;
	const detailId = `${id}-detail`;

	const handleChange = (isChecked: boolean) => {
		// Reset the detail answer when unchecked
		if (!isChecked && onDetailChange) {
			onDetailChange(null);
		}
		onChange?.(isChecked);
	};

	return (
		<div className="LunaticCheckboxWrapper">
			<div
				className={classnames('LunaticCheckboxRow', {
					focused,
					checked,
					disabled,
				})}
			>
				<input
					type="checkbox"
					id={id}
					checked={checked}
					disabled={disabled}
					aria-invalid={invalid}
					onChange={(e) => handleChange(e.target.checked)}
					onFocus={() => setFocused(true)}
					onBlur={() => setFocused(false)}
				/>
				<CheckboxIcon checked={checked} />
				<Label id={labelId} htmlFor={id} description={description}>
					{keyboardShortcut && (
						<span className="code-modality">
							{keyboardShortcut.toUpperCase()}
						</span>
					)}
					{label}
				</Label>
			</div>
			{keyboardShortcut && (
				<KeyboardEventHandler
					handleKeys={[keyboardShortcut]}
					onKeyEvent={(key, e) => {
						e.preventDefault();
						e.stopPropagation();
						handleChange(!checked);
					}}
					handleFocusableElements
				/>
			)}

			{hasDetail && checked && (
				<div className="LunaticCheckboxDetail">
					<Label htmlFor={detailId}>{detailLabel ?? 'Précisez :'}</Label>
					<input
						autoFocus
						type="text"
						id={detailId}
						disabled={disabled}
						onChange={(e) => onDetailChange(e.target.value ?? null)}
					/>
				</div>
			)}
		</div>
	);
}

export default createCustomizableLunaticField(CheckboxOption, 'CheckboxOption');

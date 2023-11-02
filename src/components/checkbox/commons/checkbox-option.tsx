import {
	type KeyboardEventHandler,
	type MouseEventHandler,
	type ReactNode,
	useState,
} from 'react';
import classnames from 'classnames';
import { createCustomizableLunaticField, Label } from '../../commons';
import './checkbox-option.scss';
import { keyHandler } from '../../../utils/event';
import KeyboardEventHandlerComponent from 'react-keyboard-event-handler';

export type CheckboxOptionProps = {
	id?: string;
	name?: string;
	disabled?: boolean;
	type?: 'checkbox' | 'radio';
	// Keyboard shortcut that toggle the checkbox
	keyboardShortcut?: string;
	invalid?: boolean;
	readOnly?: boolean;
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
	type = 'checkbox',
	onChange,
	label,
	description,
	keyboardShortcut,
	invalid,
	detailLabel,
	onDetailChange,
	readOnly,
	name,
}: CheckboxOptionProps) {
	const [focused, setFocused] = useState(false);
	const labelId = `label-${id}`;
	const hasDetail = !!onDetailChange;
	const detailId = `${id}-detail`;
	let handleClick: MouseEventHandler<HTMLInputElement> | undefined = undefined;
	let handleKeyPress: KeyboardEventHandler<HTMLInputElement> | undefined =
		undefined;

	// We want to make radio uncheckable
	if (checked && type === 'radio' && onChange) {
		handleClick = () => onChange(false);
		handleKeyPress = keyHandler('space', () => onChange(false));
	}

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
					name={name}
					type={type}
					id={id}
					checked={checked}
					disabled={disabled}
					aria-invalid={invalid}
					onClick={handleClick}
					onKeyDown={handleKeyPress}
					onChange={(e) => handleChange(e.target.checked)}
					onFocus={() => setFocused(true)}
					onBlur={() => setFocused(false)}
					readOnly={readOnly}
				/>
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
				<KeyboardEventHandlerComponent
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

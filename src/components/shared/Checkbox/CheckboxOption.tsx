import { type KeyboardEventHandler, type ReactNode } from 'react';
import type { LunaticBaseProps } from '../../type';
import { slottableComponent } from '../HOC/slottableComponent';
import { Label } from '../Label/Label';
import { useKeyboardKey } from '../../../hooks/useKeyboardKey';
import { CustomInput } from '../../Input/Input';

export type CheckboxOptionProps = {
	disabled?: boolean;
	readOnly?: boolean;
	checked?: boolean;
	id?: string;
	onCheck: (b: boolean) => void;
	label?: ReactNode;
	description?: LunaticBaseProps['description'];
	codeModality?: string;
	shortcut?: boolean;
	invalid?: boolean;
	detailAlwaysDisplayed?: boolean;
	detailLabel?: ReactNode;
	detailMaxLength?: number;
	detailValue?: string | null;
	onDetailChange?: (value: string) => void;
};

function LunaticCheckboxOption({
	disabled,
	readOnly,
	checked,
	id,
	onCheck,
	label,
	description,
	detailAlwaysDisplayed,
	detailLabel,
	detailMaxLength,
	detailValue,
	onDetailChange,
	codeModality,
	shortcut,
	invalid,
}: CheckboxOptionProps) {
	const isEnabled = !readOnly && !disabled;
	const hasDetail = !!onDetailChange;
	const hasKeyboardShortcut = Boolean(shortcut && codeModality && isEnabled);
	const onClickOption = () => {
		if (isEnabled) {
			onCheck(!checked);
		}
	};

	const handleKeyDown: KeyboardEventHandler<HTMLDivElement> = (e) => {
		if (e.code === 'Space') {
			onClickOption();
		}
	};

	const labelId = `label-${id}`;

	useKeyboardKey(
		codeModality ? [codeModality] : [],
		(e) => {
			e.preventDefault();
			onClickOption();
		},
		hasKeyboardShortcut
	);

	return (
		<>
			<div
				id={id}
				role="checkbox"
				aria-invalid={invalid}
				aria-disabled={disabled}
				aria-readonly={readOnly}
				className="lunatic-input-checkbox"
				aria-checked={checked}
				tabIndex={0}
				onClick={onClickOption}
				onKeyDown={handleKeyDown}
				aria-labelledby={labelId}
			>
				<div className="lunatic-input-checkbox__icon">
					{checked && (
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 14 11"
						>
							<path
								d="M5 11 0 6l1.4-1.4L5 8.2 12.6.6 14 2l-9 9Z"
								fill="currentColor"
							/>
						</svg>
					)}
				</div>
				<Label id={labelId} htmlFor={id} description={description}>
					{codeModality && (
						<span className="code-modality">{codeModality.toUpperCase()}</span>
					)}{' '}
					{label}
				</Label>
			</div>
			{hasDetail && (checked || detailAlwaysDisplayed) && (
				<CustomInput
					id="detailId"
					label={detailLabel ?? 'Précisez :'}
					value={typeof detailValue === 'string' ? detailValue : ''}
					maxLength={detailMaxLength}
					onChange={onDetailChange}
					disabled={disabled}
					autoFocus
				/>
			)}
		</>
	);
}

export const CheckboxOption = slottableComponent(
	'CheckboxOption',
	LunaticCheckboxOption
);

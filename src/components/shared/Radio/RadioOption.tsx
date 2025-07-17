import { type KeyboardEventHandler, useRef } from 'react';
import { slottableComponent } from '../HOC/slottableComponent';
import { useKeyboardKey } from '../../../hooks/useKeyboardKey';
import { Label } from '../Label/Label';
import classnames from 'classnames';
import { CustomInput } from '../../Input/Input';
import type { InterpretedOption } from '../../../use-lunatic/props/propOptions';

export type Props = {
	id: string;
	onKeyDown?: (v: { key: string; index: number }) => void;
	checkboxStyle?: boolean;
	shortcut?: boolean;
	disabled?: boolean;
	readOnly?: boolean;
	index?: number;
	labelledBy?: string;
	codeModality?: string;
	invalid?: boolean;
	detailAlwaysDisplayed?: boolean;
} & InterpretedOption;

function LunaticRadioOption({
	checked,
	disabled,
	readOnly,
	checkboxStyle,
	onKeyDown,
	index,
	shortcut,
	codeModality,
	id,
	invalid,
	labelledBy,
	description,
	label,
	onDetailChange,
	detailAlwaysDisplayed,
	detailLabel,
	detailMaxLength,
	detailValue,
	onCheck,
	onUncheck,
}: Props) {
	const divEl = useRef<HTMLDivElement>(null);
	const isEnabled = !disabled && !readOnly;
	const isRadio = !checkboxStyle;
	const hasDetail = !!onDetailChange;

	const onClickOption = () => {
		if (!isEnabled || !onCheck || checked) {
			// for checkboxStyle=true (only used by CheckboxOne) , we allow uncheck
			if (checkboxStyle && onUncheck) {
				onUncheck();
			}
			return;
		}
		onCheck();
	};

	const handleKeyDown: KeyboardEventHandler<HTMLDivElement> = (e) => {
		onKeyDown?.({ key: e.key, index: index ?? -1 });
		divEl.current?.blur();
	};

	const hasKeyboardShortcut = Boolean(shortcut && codeModality && isEnabled);
	useKeyboardKey(
		codeModality ? [codeModality] : [],
		(e) => {
			e.preventDefault();
			onClickOption();
		},
		hasKeyboardShortcut,
		false // disable shortcut when editing a field
	);

	return (
		<div className="lunatic-input-checkbox-wrapper">
			<div
				id={id}
				role="radio"
				aria-invalid={invalid}
				aria-disabled={disabled}
				className={classnames(
					'lunatic-input-checkbox',
					isRadio && 'lunatic-input-radio'
				)}
				aria-checked={checked}
				tabIndex={checked ? -1 : 0}
				onClick={onClickOption}
				onKeyDown={handleKeyDown}
				aria-labelledby={labelledBy}
				ref={divEl}
			>
				<div className="lunatic-input-checkbox__icon">
					{checked && checkboxStyle && (
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
				<Label id={labelledBy} htmlFor={id} description={description}>
					{codeModality && (
						<span className="code-modality">{codeModality.toUpperCase()}</span>
					)}
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
		</div>
	);
}

export const RadioOption = slottableComponent(
	'RadioOption',
	LunaticRadioOption
);

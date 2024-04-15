/* eslint-disable jsx-a11y/role-supports-aria-props */
import classnames from 'classnames';
import { useCallback, useEffect, useRef, type ReactNode } from 'react';
import { voidFunction } from '../../../utils/function';
import { Label } from '../Label/Label';
import { slottableComponent } from '../HOC/slottableComponent';
import {
	CheckboxCheckedIcon,
	CheckboxUncheckedIcon,
	RadioCheckedIcon,
	RadioUncheckedIcon,
} from '../Icons';
import { useKeyboardKey } from '../../../hooks/useKeyboardKey';

export type Props = {
	id: string;
	value?: string | null;
	description?: ReactNode;
	onClick?: (v: string | null) => void;
	checkboxStyle?: boolean;
	shortcut?: boolean;
	checked?: boolean;
	disabled?: boolean;
	readOnly?: boolean;
	onKeyDown?: (v: { key: string; index: number }) => void;
	index?: number;
	labelledBy?: string;
	label?: ReactNode;
	codeModality?: string;
	invalid?: boolean;
};

function LunaticRadioOption({
	checked,
	onClick = voidFunction,
	value = null,
	id,
	disabled,
	onKeyDown = voidFunction,
	index = -1,
	labelledBy,
	checkboxStyle,
	label,
	description,
	shortcut,
	codeModality,
	readOnly,
	invalid,
}: Props) {
	const spanEl = useRef<HTMLSpanElement>(null);
	const Icon = getIcon(checked, checkboxStyle);
	const tabIndex = checked ? 0 : -1;
	const onClickOption = useCallback(
		function () {
			if (disabled || readOnly) {
				return;
			}
			// on checkboxStyle, clicking on checked value unchecks it, so it acts as if empty answer was clicked
			checkboxStyle && checked ? onClick(null) : onClick(value);
		},
		[value, onClick, checked, checkboxStyle, disabled, readOnly]
	);

	const handleKeyDown = useCallback(
		function (e: { key: string }) {
			const { key } = e;
			onKeyDown({ key, index });
			spanEl.current?.blur();
		},
		[onKeyDown, index, spanEl]
	);

	useEffect(
		function () {
			const { current } = spanEl;
			if (current && checked) {
				current.focus();
			}
		},
		[checked, spanEl, value]
	);

	const hasKeyboardShortcut = Boolean(shortcut && codeModality);
	useKeyboardKey(
		codeModality ? [codeModality] : [],
		(e) => {
			e.preventDefault();
			onClickOption();
		},
		hasKeyboardShortcut
	);

	console.log({ codeModality });

	return (
		<>
			<div className="lunatic-radio-group-option">
				<div
					className={classnames('radio-modality', 'radio-modality-block', {
						checked,
						disabled,
						readOnly,
					})}
					aria-invalid={invalid}
				>
					<span
						id={id}
						role="radio"
						className="lunatic-input-radio"
						aria-checked={checked}
						tabIndex={tabIndex}
						onClick={onClickOption}
						onKeyDown={handleKeyDown}
						aria-labelledby={labelledBy}
						ref={spanEl}
					>
						<Icon />
						<Label id={labelledBy} htmlFor={id} description={description}>
							{codeModality && (
								<span className="code-modality">
									{codeModality.toUpperCase()}
								</span>
							)}
							{label}
						</Label>
					</span>
				</div>
			</div>
		</>
	);
}

function getIcon(checked?: boolean, checkboxStyle?: boolean) {
	if (checked) {
		if (checkboxStyle) {
			return CheckboxCheckedIcon;
		}
		return RadioCheckedIcon;
	}
	if (checkboxStyle) {
		return CheckboxUncheckedIcon;
	}
	return RadioUncheckedIcon;
}

export const RadioOption = slottableComponent(
	'RadioOption',
	LunaticRadioOption
);

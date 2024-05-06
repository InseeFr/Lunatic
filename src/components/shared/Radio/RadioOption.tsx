import {
	type KeyboardEventHandler,
	type ReactNode,
	useEffect,
	useRef,
} from 'react';
import { slottableComponent } from '../HOC/slottableComponent';
import { useKeyboardKey } from '../../../hooks/useKeyboardKey';
import { Label } from '../Label/Label';
import classnames from 'classnames';

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
	disabled,
	readOnly,
	checkboxStyle,
	onClick,
	value,
	onKeyDown,
	index,
	shortcut,
	codeModality,
	invalid,
	id,
	labelledBy,
	description,
	label,
}: Props) {
	const divEl = useRef<HTMLDivElement>(null);
	const tabIndex = checked ? 0 : -1;
	const isEnabled = !disabled && !readOnly;
	const isRadio = !checkboxStyle;
	const onClickOption = () => {
		if (!isEnabled || !onClick) {
			return;
		}
		// on checkboxStyle, clicking on checked value unchecks it, so it acts as if empty answer was clicked
		checkboxStyle && checked ? onClick(null) : onClick(value ?? null);
	};

	const handleKeyDown: KeyboardEventHandler<HTMLDivElement> = (e) => {
		onKeyDown?.({ key: e.key, index: index ?? -1 });
		divEl.current?.blur();
	};

	useEffect(
		function () {
			const { current } = divEl;
			if (current && checked) {
				current.focus();
			}
		},
		[checked, divEl, value]
	);

	const hasKeyboardShortcut = Boolean(shortcut && codeModality && isEnabled);
	useKeyboardKey(
		codeModality ? [codeModality] : [],
		(e) => {
			e.preventDefault();
			onClickOption();
		},
		hasKeyboardShortcut
	);

	return (
		<div
			id={id}
			role="radio"
			aria-disabled={disabled}
			className={classnames(
				'lunatic-input-checkbox',
				isRadio && 'lunatic-input-radio'
			)}
			aria-checked={checked}
			tabIndex={tabIndex}
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
	);
}

export const RadioOption = slottableComponent(
	'RadioOption',
	LunaticRadioOption
);

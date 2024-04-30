import { type ReactNode, useCallback } from 'react';
import type { LunaticBaseProps } from '../../type';
import { slottableComponent } from '../HOC/slottableComponent';
import { Label } from '../Label/Label';
import { useKeyboardKey } from '../../../hooks/useKeyboardKey';

export type CheckboxOptionProps = {
	disabled?: boolean;
	readOnly?: boolean;
	checked?: boolean;
	id?: string;
	onClick: (b: boolean) => void;
	label: ReactNode;
	description?: LunaticBaseProps['description'];
	codeModality?: string;
	shortcut?: boolean;
	invalid?: boolean;
};

function LunaticCheckboxOption({
	disabled,
	readOnly,
	checked,
	id,
	onClick,
	label,
	description,
	codeModality,
	shortcut,
	invalid,
}: CheckboxOptionProps) {
	const onClickOption = useCallback(
		function () {
			onClick(!checked);
		},
		[checked, onClick]
	);

	const handleKeyDown = useCallback(
		function (e: { code: string }) {
			const { code } = e;
			if (code === 'Space') {
				onClickOption();
			}
		},
		[onClickOption]
	);

	const labelId = `label-${id}`;

	const hasKeyboardShortcut = Boolean(
		shortcut && codeModality && !readOnly && !disabled
	);
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
			role="checkbox"
			aria-invalid={invalid}
			aria-disabled={disabled}
			aria-readonly={disabled}
			className={`lunatic-input-checkbox`}
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
	);
}

export const CheckboxOption = slottableComponent(
	'CheckboxOption',
	LunaticCheckboxOption
);

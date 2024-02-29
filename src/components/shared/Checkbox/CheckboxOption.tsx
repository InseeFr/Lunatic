import { type ReactNode, useCallback } from 'react';
import classnames from 'classnames';
import { CheckboxCheckedIcon, CheckboxUncheckedIcon } from '../Icons';
import './CheckboxOption.scss';
import KeyboardEventHandler from 'react-keyboard-event-handler';
import type { LunaticBaseProps } from '../../type';
import { slottableComponent } from '../HOC/slottableComponent';
import { Label } from '../Label/Label';

export type CheckboxOptionProps = {
	disabled?: boolean;
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

	const Icon = checked ? CheckboxCheckedIcon : CheckboxUncheckedIcon;
	const labelId = `label-${id}`;

	return (
		<>
			<div
				className={classnames('checkbox-modality', 'checkbox-modality-block', {
					checked,
					disabled,
				})}
			>
				<span
					id={id}
					role="checkbox"
					aria-invalid={invalid}
					className={`lunatic-input-checkbox`}
					aria-checked={checked}
					tabIndex={0}
					onClick={onClickOption}
					onKeyDown={handleKeyDown}
					aria-labelledby={labelId}
				>
					<Icon />
					<Label id={labelId} htmlFor={id} description={description}>
						{codeModality && (
							<span className="code-modality">
								{codeModality.toUpperCase()}
							</span>
						)}
						{label}
					</Label>
				</span>
			</div>
			{shortcut && codeModality && (
				<KeyboardEventHandler
					handleKeys={[codeModality]}
					onKeyEvent={(key, e) => {
						e.preventDefault();
						onClickOption();
					}}
					handleFocusableElements
				/>
			)}
		</>
	);
}

export const CheckboxOption = slottableComponent(
	'CheckboxOption',
	LunaticCheckboxOption
);

import { ReactNode, useCallback } from 'react';
import classnames from 'classnames';
import { CheckboxChecked, CheckboxUnchecked } from '../../commons/icons';
import { createCustomizableLunaticField, Label } from '../../commons';
import './checkbox-option.scss';
import KeyboardEventHandler from 'react-keyboard-event-handler';
import { LunaticBaseProps } from '../../type';

export type CheckboxOptionProps = {
	disabled?: boolean;
	checked?: boolean;
	id?: string;
	onClick: (b: boolean) => void;
	label: ReactNode;
	description?: LunaticBaseProps['description'];
	codeModality?: string;
	shortcut?: boolean;
};

function CheckboxOption({
	disabled,
	checked,
	id,
	onClick,
	label,
	description,
	codeModality,
	shortcut,
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

	const Icon = checked ? CheckboxChecked : CheckboxUnchecked;
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

export default createCustomizableLunaticField(CheckboxOption, 'CheckboxOption');

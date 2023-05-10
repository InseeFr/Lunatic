import React, { useEffect, useRef, useCallback } from 'react';
import classnames from 'classnames';
import { Label, createCustomizableLunaticField } from '../../commons';
import {
	RadioChecked,
	RadioUnchecked,
	CheckboxChecked,
	CheckboxUnchecked,
} from '../../commons/icons';
import KeyboardEventHandler from 'react-keyboard-event-handler';

function getIcon(checked, checkboxStyle) {
	if (checked) {
		if (checkboxStyle) {
			return CheckboxChecked;
		}
		return RadioChecked;
	}
	if (checkboxStyle) {
		return CheckboxUnchecked;
	}
	return RadioUnchecked;
}

function RadioOption({
	checked,
	onClick,
	value,
	id,
	disabled,
	onKeyDown,
	index,
	labelledBy,
	checkboxStyle,
	label,
	description,
	shortcut,
	codeModality,
}) {
	const spanEl = useRef();
	const Icon = getIcon(checked, checkboxStyle);
	const tabIndex = checked ? '0' : '-1';
	const onClickOption = useCallback(
		function () {
			// on checkboxStyle, clicking on checked value unchecks it, so it acts as if empty answer was clicked
			if (!disabled) {
				checkboxStyle && checked ? onClick(null) : onClick(value);
			}
		},
		[value, onClick, checked, checkboxStyle, disabled]
	);

	const handleKeyDown = useCallback(
		function (e) {
			if (!disabled) {
				const { key } = e;
				const { current } = spanEl;
				onKeyDown({ key, index });
				current.blur();
			}
		},
		[onKeyDown, index, spanEl, disabled]
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

	return (
		<>
			<div className="lunatic-radio-group-option">
				<div
					className={classnames('radio-modality', 'radio-modality-block', {
						checked,
						disabled,
					})}
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

			{shortcut && (
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

export default createCustomizableLunaticField(RadioOption, 'RadioOption');

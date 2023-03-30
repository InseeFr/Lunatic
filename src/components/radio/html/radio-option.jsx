import React, { useCallback, useEffect, useRef, useState } from 'react';
import { createCustomizableLunaticField, Label } from '../../commons';
import {
	CheckboxChecked,
	CheckboxUnchecked,
	RadioChecked,
	RadioUnchecked,
} from '../../commons/icons';

import classnames from 'classnames';
import KeyboardEventHandler from 'react-keyboard-event-handler';
import { useLunaticAutofocus } from '../../../use-lunatic/lunatic-context';

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
	currentValue,
	id,
	disabled,
	onKeyDown,
	index,
	maxIndex,
	labelledBy,
	checkboxStyle,
	label,
	description,
	shortcut,
	codeModality,
}) {
	const { autofocus, autofocusFn } = useLunaticAutofocus();
	const [hastoBeFocus] = useState(() => {
		if (autofocus) {
			if (checked) return true;
			if (!currentValue) return index === 0;
		}
		return false;
	});
	const spanEl = useRef();
	const Icon = getIcon(checked, checkboxStyle);
	const tabIndex =
		checked || (!currentValue && (index === 0 || index === maxIndex))
			? '0'
			: '-1';
	const onClickOption = useCallback(
		function () {
			// on checkboxStyle, clicking on checked value unchecks it, so it acts as if empty answer was clicked
			checkboxStyle && checked ? onClick(null) : onClick(value);
		},
		[value, onClick, checked, checkboxStyle]
	);

	const handleKeyDown = useCallback(
		function (e) {
			const { key } = e;
			onKeyDown({ key, index, checked });
			if (
				['ArrowRight', 'ArrowDown', 'ArrowLeft', 'ArrowUp', ' '].includes(key)
			) {
				e.stopPropagation();
				e.preventDefault();
			}
		},
		[onKeyDown, index, checked]
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

	useEffect(
		function () {
			const { current } = spanEl;
			if (current && hastoBeFocus) {
				current.focus();
			}
		},
		[spanEl, hastoBeFocus]
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

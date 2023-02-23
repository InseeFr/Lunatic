import './checkbox-option.scss';

import { CheckboxChecked, CheckboxUnchecked } from '../../commons/icons';
import { Label, createCustomizableLunaticField } from '../../commons';
import React, { useCallback } from 'react';

import KeyboardEventHandler from 'react-keyboard-event-handler';
import PropTypes from 'prop-types';
import classnames from 'classnames';

function CheckboxOption({
	disabled,
	checked,
	id,
	onClick,
	label,
	description,
	codeModality,
	shortcut,
	autofocus,
}) {
	const onClickOption = useCallback(
		function () {
			onClick(!checked);
		},
		[checked, onClick]
	);

	const handleKeyDown = useCallback(
		function (e) {
			const { code } = e;
			if (code === 'Space') {
				onClickOption();
			}
		},
		[onClickOption]
	);

	const Icon = checked ? CheckboxChecked : CheckboxUnchecked;
	const labelId = `label-${id}`;
	const autoFocusFn = useCallback(
		(element) => (element && autofocus ? element.focus() : null),
		[autofocus]
	);
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
					tabIndex="0"
					onClick={onClickOption}
					onKeyDown={handleKeyDown}
					aria-labelledby={labelId}
					ref={autoFocusFn}
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

CheckboxOption.prototype = {
	id: PropTypes.string.isRequired,
	onClick: PropTypes.func.isRequired,
	checked: PropTypes.bool,
	disabled: PropTypes.bool,
	label: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
	description: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.element,
		PropTypes.array,
	]),
};

CheckboxOption.defaultProps = {
	checked: undefined,
	disabled: false,
	label: undefined,
	description: undefined,
};

export default createCustomizableLunaticField(CheckboxOption, 'CheckboxOption');

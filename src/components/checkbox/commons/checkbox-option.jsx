import './checkbox-option.scss';

import React, { useCallback } from 'react';
import { createCustomizableLunaticField, Label } from '../../commons';
import { CheckboxChecked, CheckboxUnchecked } from '../../commons/icons';

import classnames from 'classnames';
import PropTypes from 'prop-types';
import KeyboardEventHandler from 'react-keyboard-event-handler';
import { useLunaticAutofocus } from '../../../use-lunatic/lunatic-context';

function CheckboxOption({
	disabled,
	checked,
	id,
	onClick,
	label,
	description,
	codeModality,
	shortcut,
	index,
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

	const { autofocusFn } = useLunaticAutofocus();
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
					ref={index === 0 ? autofocusFn : null}
					role="checkbox"
					className={`lunatic-input-checkbox`}
					aria-checked={checked}
					tabIndex="0"
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

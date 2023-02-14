import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { CheckboxChecked, CheckboxUnchecked } from '../../commons/icons';
import { createCustomizableLunaticField, Label } from '../../commons';
import './checkbox-option.scss';

function CheckboxOption({
	disabled,
	checked,
	id,
	onClick,
	label,
	description,
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

	return (
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
			>
				<Icon />
				<Label id={labelId} htmlFor={id} description={description}>
					{label}
				</Label>
			</span>
		</div>
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

import React, { useCallback } from 'react';
import classnames from 'classnames';
import CheckboxChecked from '../../../utils/icons/checkbox-checked.icon';
import CheckboxUnchecked from '../../../utils/icons/checkbox-unchecked.icon';

function CheckboxOption({ disabled, checked, id, value, onClick, labelledBy }) {
	const onClickOption = useCallback(
		function () {
			onClick(value);
		},
		[value, onClick]
	);

	const handleKeyDown = useCallback(function (e) {
		const { key } = e;
		if (key === 'Space') {
			// TODO
		}
	}, []);

	const Icon = checked ? CheckboxChecked : CheckboxUnchecked;

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
				aria-labelledby={labelledBy}
			>
				<Icon />
			</span>
		</div>
	);
}

export default CheckboxOption;

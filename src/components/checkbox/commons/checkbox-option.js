import React, { useCallback } from 'react';
import classnames from 'classnames';
import { CheckboxChecked, CheckboxUnchecked } from '../../commons/icons';

function CheckboxOption({
	disabled,
	checked,
	id,
	value = false,
	onClick,
	labelledBy,
}) {
	const onClickOption = useCallback(
		function () {
			onClick(!value);
		},
		[value, onClick]
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

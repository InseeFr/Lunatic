import React, { useEffect, useRef, useCallback } from 'react';
import classnames from 'classnames';
import RadioChecked from '../../utils/icons/radio-checked.icon';
import RadioUnchecked from '../../utils/icons/radio-unchecked.icon';

function RadioOption({
	checked,
	onClick,
	value,
	id,
	disabled,
	onKeyDown,
	index,
	labelledBy,
}) {
	const spanEl = useRef();
	const Icon = checked ? RadioChecked : RadioUnchecked;
	const tabIndex = checked ? '0' : '-1';

	const onClickOption = useCallback(
		function () {
			onClick(value);
		},
		[value, onClick]
	);

	const handleKeyDown = useCallback(
		function (e) {
			const { key } = e;
			const { current } = spanEl;
			onKeyDown({ key, index });
			current.blur();
		},
		[onKeyDown, index, spanEl]
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
			</span>
		</div>
	);
}

export default RadioOption;

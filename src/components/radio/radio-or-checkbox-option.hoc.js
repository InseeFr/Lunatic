import React, { useCallback, useRef, useEffect } from 'react';
import classnames from 'classnames';
import RadioChecked from '../../utils/icons/radio-checked.icon';
import RadioUnchecked from '../../utils/icons/radio-unchecked.icon';

function getIcon(checked, type) {
	return checked ? RadioChecked : RadioUnchecked;
}

function radioOrCheckBoxHOC(type) {
	if (type === 'radio' || type === 'checkbox') {
		return function RadioOrCheckboxOption({
			checked,
			disabled,
			onClick,
			value,
			id,
			index,
			onKeyDown,
			labelledBy,
		}) {
			const spanEl = useRef();
			const Icon = getIcon(checked, type);
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
					className={classnames(`${type}-modality`, `${type}-modality-block`, {
						checked,
						disabled,
					})}
				>
					<span
						id={id}
						role={type}
						className={`lunatic-input-${type}`}
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
		};
	} else throw new Error('Invalid type');
}

export default radioOrCheckBoxHOC;

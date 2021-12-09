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
			label,
			checked,
			disabled,
			onClick,
			value,
			id,
			index,
			onKeyDown,
		}) {
			const spanEl = useRef();
			const Icon = getIcon(checked, type);

			const onClickOption = useCallback(
				function () {
					onClick(value);
				},
				[value, onClick]
			);

			const onKeyDown_ = useCallback(
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
					className={classnames(`lunatic-${type}-option`, {
						checked,
						disabled,
					})}
				>
					<span
						id={`${type}-${id}-${value}`}
						role={type}
						className={`lunatic-input-${type} `}
						aria-checked={checked}
						tabIndex={checked ? '0' : '-1'}
						onClick={onClickOption}
						onKeyDown={onKeyDown_}
						aria-labelledby={`${type}-label-${id}-${value}`}
						ref={spanEl}
					>
						<Icon />
					</span>
					<label
						id={`${type}-label-${id}-${value}`}
						for={`${type}-${id}-${value}`}
					>
						{label}
					</label>
				</div>
			);
		};
	} else throw new Error('Invalid type');
}

export default radioOrCheckBoxHOC;

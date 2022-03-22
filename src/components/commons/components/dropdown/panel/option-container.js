import React, { useRef, useEffect, useCallback } from 'react';
import classnames from 'classnames';

function getMin(rect) {
	const { top } = rect;
	return top;
}

function getMax(rect) {
	const { top, height } = rect;
	return top + height;
}

function isVisible(optionRect, parentRect) {
	const min = Math.min(getMin(optionRect), getMin(parentRect));
	const max = Math.max(getMax(optionRect), getMax(parentRect));
	if (max - min < optionRect.height + parentRect.height) {
		return true;
	}
	return false;
}

function OptionContainer({ children, index, selected, onClickOption }) {
	const ref = useRef();

	const onClickOptionEx = useCallback(
		function (e) {
			e.stopPropagation();
			e.preventDefault();
			onClickOption(index);
		},
		[onClickOption, index]
	);

	useEffect(
		function () {
			const { current } = ref;
			if (current && selected) {
				const oRect = current.getBoundingClientRect();
				const pRect = current.parentNode.getBoundingClientRect();
				if (!isVisible(oRect, pRect)) {
					current.scrollIntoView();
				}
			}
		},
		[ref, selected]
	);

	return (
		<li
			className={classnames('lunatic-dropdown-option', { selected })}
			role="option"
			aria-selected={selected}
			onClick={onClickOptionEx}
			ref={ref}
		>
			{children}
		</li>
	);
}

export default OptionContainer;

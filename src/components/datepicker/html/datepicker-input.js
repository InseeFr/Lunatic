import React, { useCallback } from 'react';

import classnames from 'classnames';

function DatepickerInput({
	id,
	disabled,
	readOnly,
	labelId,
	value,
	onChange,
	min,
	max,
	autofocus,
}) {
	const autoFocusFn = useCallback(
		(element) => (element && autofocus ? element.focus() : null),
		[autofocus]
	);
	return (
		<input
			id={id}
			ref={autoFocusFn}
			className={classnames('lunatic-datepicker', { disabled, readOnly })}
			type="date"
			labelledby={labelId}
			readOnly={readOnly}
			disabled={disabled}
			value={value}
			onChange={onChange}
			min={min}
			max={max}
		/>
	);
}

export default DatepickerInput;

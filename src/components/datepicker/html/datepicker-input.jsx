import React from 'react';
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
}) {
	return (
		<input
			id={id}
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

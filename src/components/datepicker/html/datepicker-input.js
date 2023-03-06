import React from 'react';
import classnames from 'classnames';
import { useLunaticAutofocus } from '../../../use-lunatic/lunatic-context';

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
	const { autofocusFn } = useLunaticAutofocus();
	return (
		<input
			id={id}
			ref={autofocusFn}
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

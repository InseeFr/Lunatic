import React, { useCallback } from 'react';
import classnames from 'classnames';
import './datepicker.scss';

function Datepicker({ disabled, readOnly, value, onChange, labelId }) {
	const handleChange = useCallback(
		function (e) {
			const value = e.target.value;
			onChange(value);
		},
		[onChange]
	);

	return (
		<input
			className={classnames('lunatic-datepicker', { disabled, readOnly })}
			type="date"
			labelledby={labelId}
			readOnly={readOnly}
			disabled={disabled}
			value={value}
			onChange={handleChange}
		/>
	);
}
export default Datepicker;

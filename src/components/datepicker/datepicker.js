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
			className={classnames('datepicker-lunatic', { disabled, readOnly })}
			type="date"
			labelledBy={labelId}
			readOnly={readOnly}
			disabled={disabled}
			value={value}
			onChange={handleChange}
		/>
	);
}
export default Datepicker;

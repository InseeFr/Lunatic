import React from 'react';
import Datepicker from './datepicker';
import { useOnHandleChange, createLunaticComponent } from '../commons';
import './datepicker.scss';

function LunaticDatepicker({
	id,
	response,
	value,
	handleChange,
	disabled,
	readOnly,
}) {
	const onChange = useOnHandleChange({ handleChange, response, value });

	const inputId = `lunatic-datepicker-${id}`;
	const labelId = `lunatic-datepicker-label-${id}`;

	return (
		<Datepicker
			id={inputId}
			labelledBy={labelId}
			value={value}
			onChange={onChange}
			disabled={disabled}
			readOnly={readOnly}
		/>
	);
}

export default createLunaticComponent(LunaticDatepicker);

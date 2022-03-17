import React from 'react';
import PropTypes from 'prop-types';
import { LunaticField, useOnHandleChange } from '../commons';
import Textarea from './textarea';

function LunaticTextarea({
	label,
	declarations,
	id,
	handleChange,
	response,
	value,
	custom,
	rows,
	maxLength,
	cols,
	placeholder,
}) {
	const inputId = `lunatic-textarea-${id}`;
	const labelId = `lunatic-textarea-label-${id}`;

	const onChange = useOnHandleChange({ handleChange, response, value });

	return (
		<LunaticField
			label={label}
			contentId={inputId}
			labelId={labelId}
			declarations={declarations}
			id={id}
			value={value}
			className="lunatic-switch"
		>
			<Textarea
				onChange={onChange}
				custom={custom}
				rows={rows}
				maxLength={maxLength}
				cols={cols}
				placeholder={placeholder}
				value={value}
			/>
		</LunaticField>
	);
}

Textarea.defaultProps = {
	rows: 1,
	maxLength: 100,
	cols: 32,
	placeholder: 'Please enter your text here',
};

Textarea.propTypes = {
	rows: PropTypes.number,
	maxLength: PropTypes.number,
	cols: PropTypes.number,
	placeholder: PropTypes.string,
};

export default LunaticTextarea;

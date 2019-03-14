import React from 'react';
import PropTypes from 'prop-types';
import { buildStyleObject } from '../../utils/string-utils';
import { getLabelPositionClass } from '../../utils/label-position';
import './datepicker.scss';

const Datepicker = ({
	id,
	label,
	value,
	placeholder,
	handleChange,
	readOnly,
	labelPosition,
	required,
	style,
}) => (
	<div className={getLabelPositionClass(labelPosition)}>
		{label && (
			<label
				htmlFor={`datepicker-${id}`}
				id={`input-label-${id}`}
				className={`${required ? 'required' : ''}`}
			>
				{label}
			</label>
		)}
		<input
			type="date"
			id={`datepicker-${id}`}
			value={value}
			placeholder={placeholder || ''}
			className="datepicker-lunatic"
			style={buildStyleObject(style)}
			readOnly={readOnly}
			required={required}
			aria-required={required}
			onChange={e => handleChange(e.target.value)}
		/>
	</div>
);

Datepicker.defaultProps = {
	placeholder: '',
	readOnly: false,
	labelPosition: 'DEFAULT',
	required: false,
};

Datepicker.propTypes = {
	id: PropTypes.string,
	label: PropTypes.string,
	value: PropTypes.string,
	placeholder: PropTypes.string,
	handleChange: PropTypes.func.isRequired,
	readOnly: PropTypes.bool,
	labelPosition: PropTypes.oneOf(['DEFAULT', 'TOP', 'BOTTOM', 'LEFT', 'RIGHT']),
	required: PropTypes.bool,
	style: PropTypes.object,
};

export default Datepicker;

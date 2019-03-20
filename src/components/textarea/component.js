import React from 'react';
import PropTypes from 'prop-types';
import Declarations from '../declarations';
import * as C from '../../utils/constants';
import { declarationsPropTypes } from '../../utils/prop-types';
import { buildStyleObject } from '../../utils/string-utils';
import { getLabelPositionClass } from '../../utils/label-position';
import './textarea.scss';

const Textarea = ({
	id,
	label,
	value,
	placeholder,
	handleChange,
	rows,
	maxLength,
	readOnly,
	labelPosition,
	required,
	declarations,
	style,
}) => (
	<div className={getLabelPositionClass(labelPosition)}>
		<Declarations
			id={id}
			type={C.BEFORE_QUESTION_TEXT}
			declarations={declarations}
		/>
		{label && (
			<label
				htmlFor={`textarea-${id}`}
				id={`textarea-label-${id}`}
				className={`${required ? 'required' : ''}`}
			>
				{label}
			</label>
		)}
		<Declarations
			id={id}
			type={C.AFTER_QUESTION_TEXT}
			declarations={declarations}
		/>
		<textarea
			id={`textarea-${id}`}
			placeholder={placeholder}
			value={value}
			className="textarea-lunatic"
			style={buildStyleObject(style)}
			rows={rows}
			maxLength={maxLength}
			readOnly={readOnly}
			required={required}
			aria-required={required}
			onChange={e => handleChange(e.target.value)}
		/>
		<Declarations id={id} type={C.DETACHABLE} declarations={declarations} />
	</div>
);

Textarea.defaultProps = {
	placeholder: '',
	rows: 5,
	readOnly: false,
	labelPosition: 'DEFAULT',
	required: false,
	declarations: [],
};

Textarea.propTypes = {
	id: PropTypes.string,
	label: PropTypes.string,
	value: PropTypes.string,
	placeholder: PropTypes.string,
	handleChange: PropTypes.func.isRequired,
	rows: PropTypes.number.isRequired,
	maxLength: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
	readOnly: PropTypes.bool,
	labelPosition: PropTypes.oneOf(['DEFAULT', 'TOP', 'BOTTOM', 'LEFT', 'RIGHT']),
	required: PropTypes.bool,
	declarations: declarationsPropTypes,
	style: PropTypes.object,
};

export default Textarea;

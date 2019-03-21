import React from 'react';
import PropTypes from 'prop-types';
import Declarations from '../declarations';
import * as C from '../../utils/constants';
import { declarationsPropTypes } from '../../utils/prop-types';
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
	declarations,
	style,
}) => (
	<React.Fragment>
		<Declarations
			id={id}
			type={C.BEFORE_QUESTION_TEXT}
			declarations={declarations}
		/>
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
			<Declarations
				id={id}
				type={C.AFTER_QUESTION_TEXT}
				declarations={declarations}
			/>
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
		<Declarations id={id} type={C.DETACHABLE} declarations={declarations} />
	</React.Fragment>
);

Datepicker.defaultProps = {
	placeholder: '',
	readOnly: false,
	labelPosition: 'DEFAULT',
	required: false,
	declarations: [],
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
	declarations: declarationsPropTypes,
	style: PropTypes.object,
};

export default Datepicker;

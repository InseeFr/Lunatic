import React from 'react';
import PropTypes from 'prop-types';
import Writable from './writable';
import Simple from './simple';
import Declarations from '../declarations';
import * as C from '../../utils/constants';
import { declarationsPropTypes } from '../../utils/prop-types';
import { getLabelPositionClass } from '../../utils/label-position';
import './dropdown.scss';

const Dropdown = ({
	id,
	label,
	labelPosition,
	writable,
	required,
	declarations,
	...props
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
		{writable ? <Writable {...props} /> : <Simple {...props} />}
		<Declarations id={id} type={C.DETACHABLE} declarations={declarations} />
	</div>
);

Dropdown.defaultProps = {
	label: '',
	labelPosition: 'DEFAULT',
	writable: false,
	required: false,
	declarations: [],
};

Dropdown.propTypes = {
	id: PropTypes.string.isRequired,
	label: PropTypes.string,
	labelPosition: PropTypes.oneOf(['DEFAULT', 'TOP', 'BOTTOM', 'LEFT', 'RIGHT']),
	writable: PropTypes.bool,
	required: PropTypes.bool,
	declarations: declarationsPropTypes,
};

export default Dropdown;

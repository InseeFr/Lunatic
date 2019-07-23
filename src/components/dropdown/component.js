import React from 'react';
import PropTypes from 'prop-types';
import Writable from './writable';
import Simple from './simple';
import Declarations from '../declarations';
import { TooltipResponse } from '../tooltip';
import * as U from '../../utils/lib';
import './dropdown.scss';

const Dropdown = ({
	id,
	label,
	labelPosition,
	writable,
	required,
	declarations,
	...props
}) => {
	const { preferences, response, handleChange, tooltip } = props;
	const value = U.getResponseByPreference(preferences)(response);
	const handler = value =>
		handleChange({
			[U.getResponseName(response)]: value,
		});
	return (
		<div className={U.getLabelPositionClass(labelPosition)}>
			<Declarations
				id={id}
				type={U.BEFORE_QUESTION_TEXT}
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
				type={U.AFTER_QUESTION_TEXT}
				declarations={declarations}
			/>
			<div className="field-container">
				<div className={`${tooltip ? 'field-with-tooltip' : 'field'}`}>
					{writable ? (
						<Writable {...props} value={value} handleChange={handler} />
					) : (
						<Simple {...props} value={value} handleChange={handler} />
					)}
				</div>
				{tooltip && (
					<div className="tooltip">
						<TooltipResponse id={id} response={response} />
					</div>
				)}
			</div>
			<Declarations id={id} type={U.DETACHABLE} declarations={declarations} />
		</div>
	);
};

Dropdown.defaultProps = {
	label: '',
	preferences: ['COLLECTED'],
	response: {},
	placeholder: '',
	writable: false,
	required: false,
	tooltip: false,
	labelPosition: 'DEFAULT',
	declarations: [],
	tooltip: false,
	style: {},
};

Dropdown.propTypes = {
	id: PropTypes.string.isRequired,
	label: PropTypes.string,
	preferences: PropTypes.arrayOf(U.valueTypePropTypes),
	response: U.responsePropTypes,
	options: U.optionsPropTypes,
	handleChange: PropTypes.func.isRequired,
	placeholder: PropTypes.string,
	readOnly: PropTypes.bool,
	writable: PropTypes.bool,
	required: PropTypes.bool,
	labelPosition: PropTypes.oneOf(['DEFAULT', 'TOP', 'BOTTOM', 'LEFT', 'RIGHT']),
	declarations: U.declarationsPropTypes,
	tooltip: PropTypes.bool,
	style: PropTypes.object,
};

export default Dropdown;

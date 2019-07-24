import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { TooltipResponse } from '../tooltip';
import Declarations from '../declarations';
import * as U from '../../utils/lib';
import * as C from '../../utils/constants';
import './datepicker.scss';

const Datepicker = ({
	id,
	label,
	preferences,
	response,
	placeholder,
	handleChange,
	readOnly,
	labelPosition,
	required,
	focused,
	declarations,
	tooltip,
	style,
}) => {
	const inputRef = useRef();

	useEffect(() => {
		if (focused) inputRef.current.focus();
	}, [focused]);

	return (
		<React.Fragment>
			<Declarations
				id={id}
				type={C.BEFORE_QUESTION_TEXT}
				declarations={declarations}
			/>
			<div className={U.getLabelPositionClass(labelPosition)}>
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
				<div className="field-container">
					<div className={`${tooltip ? 'field-with-tooltip' : 'field'}`}>
						<input
							type="date"
							id={`datepicker-${id}`}
							ref={inputRef}
							value={U.getResponseByPreference(preferences)(response)}
							placeholder={placeholder || ''}
							className="datepicker-lunatic"
							style={U.buildStyleObject(style)}
							readOnly={readOnly}
							required={required}
							aria-required={required}
							onChange={e =>
								handleChange({
									[U.getResponseName(response)]: e.target.value,
								})
							}
						/>
					</div>
					{tooltip && (
						<div className="tooltip">
							<TooltipResponse id={id} response={response} />
						</div>
					)}
				</div>
			</div>
			<Declarations id={id} type={C.DETACHABLE} declarations={declarations} />
		</React.Fragment>
	);
};

Datepicker.defaultProps = {
	preferences: ['COLLECTED'],
	placeholder: '',
	readOnly: false,
	labelPosition: 'DEFAULT',
	required: false,
	focused: false,
	response: {},
	declarations: [],
	tooltip: false,
	style: {},
};

Datepicker.propTypes = {
	id: PropTypes.string,
	label: PropTypes.string,
	preferences: PropTypes.arrayOf(U.valueTypePropTypes),
	response: U.responsePropTypes,
	placeholder: PropTypes.string,
	handleChange: PropTypes.func.isRequired,
	readOnly: PropTypes.bool,
	labelPosition: PropTypes.oneOf(['DEFAULT', 'TOP', 'BOTTOM', 'LEFT', 'RIGHT']),
	required: PropTypes.bool,
	focused: PropTypes.bool,
	declarations: U.declarationsPropTypes,
	tooltip: PropTypes.bool,
	style: PropTypes.object,
};

export default Datepicker;

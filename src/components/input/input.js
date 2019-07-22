import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import Declarations from '../declarations';
import { TooltipResponse } from '../tooltip';
import * as C from '../../utils/constants';
import * as U from '../../utils';
import { declarationsPropTypes } from '../../utils/prop-types';
import { buildStyleObject } from '../../utils/string-utils';
import { getLabelPositionClass } from '../../utils/label-position';
import './input.scss';

const Input = ({
	id,
	label,
	preferences,
	response,
	placeholder,
	handleChange,
	readOnly,
	autoComplete,
	labelPosition,
	required,
	declarations,
	focused,
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
			<div className={getLabelPositionClass(labelPosition)}>
				{label && (
					<label
						htmlFor={`input-${id}`}
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
							type="text"
							id={`input-${id}`}
							ref={inputRef}
							value={U.getResponseByPreference(preferences)(response)}
							placeholder={placeholder}
							autoComplete={autoComplete ? 'on' : 'off'}
							className="input-lunatic"
							style={buildStyleObject(style)}
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

Input.defaultProps = {
	preferences: ['COLLECTED'],
	response: {},
	placeholder: '',
	readOnly: false,
	autoComplete: false,
	labelPosition: 'DEFAULT',
	required: false,
	focused: false,
	declarations: [],
	tooltip: false,
	style: {},
};

Input.propTypes = {
	id: PropTypes.string,
	label: PropTypes.string,
	preferences: PropTypes.arrayOf(U.valueTypePropTypes),
	response: U.responsePropTypes,
	placeholder: PropTypes.string,
	handleChange: PropTypes.func.isRequired,
	readOnly: PropTypes.bool,
	autoComplete: PropTypes.bool,
	labelPosition: PropTypes.oneOf(['DEFAULT', 'TOP', 'BOTTOM', 'LEFT', 'RIGHT']),
	required: PropTypes.bool,
	focused: PropTypes.bool,
	declarations: declarationsPropTypes,
	tooltip: PropTypes.bool,
	style: PropTypes.object,
};

export default Input;

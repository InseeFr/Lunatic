import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import Declarations from '../declarations';
import { TooltipResponse } from '../tooltip';
import * as U from '../../utils/lib';
import * as C from '../../utils/constants';
import './input.scss';

const Input = ({
	id,
	label,
	preferences,
	response,
	placeholder,
	handleChange,
	maxLength,
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
			<div className={U.getLabelPositionClass(labelPosition)}>
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
							style={U.buildStyleObject(style)}
							readOnly={readOnly}
							maxLength={maxLength}
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
	label: '',
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
	id: PropTypes.string.isRequired,
	label: PropTypes.string,
	preferences: PropTypes.arrayOf(U.valueTypePropTypes),
	response: U.responsePropTypes,
	placeholder: PropTypes.string,
	handleChange: PropTypes.func.isRequired,
	readOnly: PropTypes.bool,
	maxLength: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
	autoComplete: PropTypes.bool,
	labelPosition: PropTypes.oneOf(['DEFAULT', 'TOP', 'BOTTOM', 'LEFT', 'RIGHT']),
	required: PropTypes.bool,
	focused: PropTypes.bool,
	declarations: U.declarationsPropTypes,
	tooltip: PropTypes.bool,
	style: PropTypes.object,
};

export default Input;

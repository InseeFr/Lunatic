import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import Declarations from '../declarations';
import { TooltipResponse } from '../tooltip';
import * as U from '../../utils/lib';
import './textarea.scss';

const Textarea = ({
	id,
	label,
	preferences,
	response,
	placeholder,
	handleChange,
	rows,
	maxLength,
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
					<textarea
						id={`textarea-${id}`}
						ref={inputRef}
						placeholder={placeholder}
						value={U.getResponseByPreference(preferences)(response)}
						className="textarea-lunatic"
						style={U.buildStyleObject(style)}
						rows={rows}
						maxLength={maxLength}
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
			<Declarations id={id} type={U.DETACHABLE} declarations={declarations} />
		</div>
	);
};

Textarea.defaultProps = {
	preferences: ['COLLECTED'],
	response: {},
	placeholder: '',
	rows: 5,
	readOnly: false,
	labelPosition: 'DEFAULT',
	required: false,
	focused: false,
	declarations: [],
	tooltip: false,
	style: {},
};

Textarea.propTypes = {
	id: PropTypes.string,
	label: PropTypes.string,
	preferences: PropTypes.arrayOf(U.valueTypePropTypes),
	response: U.responsePropTypes,
	placeholder: PropTypes.string,
	handleChange: PropTypes.func.isRequired,
	rows: PropTypes.number.isRequired,
	maxLength: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
	readOnly: PropTypes.bool,
	labelPosition: PropTypes.oneOf(['DEFAULT', 'TOP', 'BOTTOM', 'LEFT', 'RIGHT']),
	required: PropTypes.bool,
	focused: PropTypes.bool,
	declarations: U.declarationsPropTypes,
	tooltip: PropTypes.bool,
	style: PropTypes.object,
};

export default Textarea;

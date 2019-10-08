import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import Declarations from '../declarations';
import { TooltipResponse } from '../tooltip';
import * as U from '../../utils/lib';
import * as C from '../../utils/constants';
import './input.scss';

const InputNumber = ({
	id,
	label,
	preferences,
	response,
	min,
	max,
	decimals,
	placeholder,
	handleChange,
	readOnly,
	autoComplete,
	focused,
	style,
	unit,
	labelPosition,
	unitPosition,
	declarations,
	tooltip,
	required,
	validators,
}) => {
	const [messagesError, setMessagesError] = useState(
		[minMaxValidator({ min, max }), ...validators]
			.map(v => v(U.getResponseByPreference(preferences)(response)))
			.filter(m => m !== undefined)
	);
	const inputRef = useRef();

	const validate = value => {
		setMessagesError(
			[minMaxValidator({ min, max }), ...validators]
				.map(v => v(value))
				.filter(m => m !== undefined)
		);
	};

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
				<label
					htmlFor={`input-${id}`}
					id={`input-label-${id}`}
					className={`${required ? 'required' : ''}`}
				>
					{label}{' '}
					<span className="unit">
						{unit && ['DEFAULT', 'BEFORE'].includes(unitPosition)
							? `(${unit})`
							: ''}
					</span>
				</label>
				<Declarations
					id={id}
					type={C.AFTER_QUESTION_TEXT}
					declarations={declarations}
				/>
				<div className="field-container">
					<div className={`${tooltip ? 'field-with-tooltip' : 'field'}`}>
						<input
							type="number"
							id={`input-${id}`}
							ref={inputRef}
							aria-labelledby={`input-label-${id}`}
							value={U.getResponseByPreference(preferences)(response)}
							min={min}
							max={max}
							step={decimals ? `${Math.pow(10, -decimals)}` : '0'}
							placeholder={placeholder}
							className={`input-lunatic ${
								messagesError.length > 0 ? 'warning' : ''
							}`}
							style={U.buildStyleObject(style)}
							readOnly={readOnly}
							autoComplete={autoComplete ? 'on' : 'off'}
							required={required}
							aria-required={required}
							onChange={e => {
								const {
									target: { value },
								} = e;
								validate(value);
								handleChange({
									[U.getResponseName(response)]: value,
								});
							}}
						/>
					</div>
					{tooltip && (
						<div className="tooltip">
							<TooltipResponse id={id} response={response} />
						</div>
					)}
				</div>
				<div className="unit">{unitPosition === 'AFTER' && unit}</div>
				<div className="lunatic-input-number-errors">
					{messagesError.map((m, i) => (
						<div key={i} className="error">
							{m}
						</div>
					))}
				</div>
			</div>
			<Declarations id={id} type={C.DETACHABLE} declarations={declarations} />
		</React.Fragment>
	);
};

const minMaxValidator = ({ min, max }) => value => {
	if (!value) {
		return undefined;
	}
	const valueNumber = Number(value);
	if (!min && isDef(max) && valueNumber > max)
		return <span>{`La valeur doit être inférieure à ${max}`}</span>;
	else if (isDef(min) && !max && valueNumber < min)
		return <span>{`La valeur doit être supérieure à ${min}`}</span>;
	else if (isDef(min) && isDef(max) && (valueNumber < min || valueNumber > max))
		return <span>{`La valeur doit être comprise entre ${min} et ${max}`}</span>;
	return undefined;
};

const isDef = number => number || number === 0;

InputNumber.defaultProps = {
	label: '',
	preferences: ['COLLECTED'],
	response: {},
	min: undefined,
	max: undefined,
	decimals: 0,
	placeholder: '',
	readOnly: false,
	autoComplete: false,
	focused: false,
	declarations: [],
	labelPosition: 'DEFAULT',
	unitPositioni: 'DEFAULT',
	required: false,
	tooltip: false,
	style: {},
	validators: [],
};

InputNumber.propTypes = {
	id: PropTypes.string.isRequired,
	label: PropTypes.string,
	preferences: PropTypes.arrayOf(U.valueTypePropTypes),
	response: U.responsePropTypes,
	min: PropTypes.number,
	max: PropTypes.number,
	decimals: PropTypes.number,
	placeholder: PropTypes.string,
	handleChange: PropTypes.func.isRequired,
	readOnly: PropTypes.bool,
	autoComplete: PropTypes.bool,
	focused: PropTypes.bool,
	declarations: U.declarationsPropTypes,
	labelPosition: PropTypes.oneOf(['DEFAULT', 'TOP', 'BOTTOM', 'LEFT', 'RIGHT']),
	unitPosition: PropTypes.oneOf(['DEFAULT', 'BEFORE', 'AFTER']),
	required: PropTypes.bool,
	tooltip: PropTypes.bool,
	style: PropTypes.object,
	validators: PropTypes.arrayOf(PropTypes.func),
};

export default InputNumber;

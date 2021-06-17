import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import Declarations from '../';
import { TooltipResponse } from '../../tooltip';
import * as U from '../../../utils/lib';
import * as C from '../../../constants';
import { interpret } from '../../../utils/to-expose';

const InputDeclarationsWrapper = ({
	id,
	label,
	preferences,
	response,
	placeholder,
	handleChange,
	maxLength,
	readOnly,
	disabled,
	autoComplete,
	labelPosition,
	mandatory,
	declarations,
	features,
	bindings,
	focused,
	management,
	style,
	type,
	roleType,
	min,
	max,
	decimals,
	unit,
	unitPosition,
	validators,
	isInputNumber,
	numberAsTextfield,
	componentType,
	logFunction,
}) => {
	const inputRef = useRef();
	const logInfo = {
		id,
		componentType,
		responseName: U.getResponseName(response),
		category: C.INPUT_CATEGORY,
	};

	const [value, setValue] = useState(() =>
		U.getResponseByPreference(preferences)(response)
	);

	const [messagesError, setMessagesError] = useState(
		validators.map((v) => v(value)).filter((m) => m !== undefined)
	);

	useEffect(() => {
		if (focused) inputRef.current.focus();
	}, [focused]);

	// Assume we only want to handle enable external updates
	// Don't need to check all value changes
	useEffect(() => {
		if (U.getResponseByPreference(preferences)(response) !== value)
			setValue(U.getResponseByPreference(preferences)(response));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [response, preferences]);

	const validate = (v) => {
		setMessagesError(
			validators.map((f) => f(v)).filter((m) => m !== undefined)
		);
	};

	useEffect(() => {
		if (isInputNumber) {
			setMessagesError(
				validators.map((v) => v(value)).filter((m) => m !== undefined)
			);
		}
	}, [value, min, max, validators, isInputNumber]);

	const handleChangeOnBlur = () => {
		const finalValue =
			value && value.endsWith('.') ? value.replace('.', '') : value;
		handleChange({
			[U.getResponseName(response)]: finalValue,
		});
		if (U.isFunction(logFunction))
			logFunction({
				...logInfo,
				value: value,
				type: C.FOCUS_OUT,
			});
		if (value !== finalValue) setValue(finalValue);
	};

	const handleFocusIn = () => {
		if (U.isFunction(logFunction))
			logFunction({
				...logInfo,
				value: value,
				type: C.FOCUS_IN,
			});
	};

	const Component = roleType === 'textarea' ? 'textarea' : 'input';

	return (
		<>
			<Declarations
				id={id}
				type={C.BEFORE_QUESTION_TEXT}
				declarations={declarations}
				features={features}
				bindings={bindings}
			/>
			<div className={U.getLabelPositionClass(labelPosition)}>
				{label && (
					<label
						htmlFor={`${roleType}-${id}`}
						id={`${roleType}-label-${id}`}
						className={`${mandatory ? 'mandatory' : ''}`}
					>
						{interpret(features)(bindings)(label)}
						{isInputNumber &&
							unit &&
							['DEFAULT', 'BEFORE'].includes(unitPosition) && (
								<span className="unit">{` (${unit})`}</span>
							)}
					</label>
				)}
				<Declarations
					id={id}
					type={C.AFTER_QUESTION_TEXT}
					declarations={declarations}
					features={features}
					bindings={bindings}
				/>
				<div className="field-container">
					<div className={`${management ? 'field-with-tooltip' : 'field'}`}>
						<Component
							type={type}
							id={`${roleType}-${id}`}
							ref={inputRef}
							value={value || ''}
							min={min}
							max={max}
							step={decimals ? `${Math.pow(10, -decimals)}` : '0'}
							placeholder={placeholder}
							autoComplete={autoComplete ? 'on' : 'off'}
							className={`${roleType}-lunatic ${
								isInputNumber && messagesError.length > 0 ? 'warning' : ''
							}`}
							style={U.buildStyleObject(style)}
							readOnly={readOnly}
							disabled={disabled}
							maxLength={maxLength || 524288}
							required={mandatory}
							aria-required={mandatory}
							onChange={(e) => {
								const v = e.target.value;
								if (isInputNumber) {
									if (
										numberAsTextfield &&
										v !== '' &&
										!U.isNumberValid(v, decimals)
									) {
										e.preventDefault();
										e.stopPropagation();
										return null;
									} else validate(v);
								}
								if (management) setValue(v);
								else setValue(v === '' ? null : v);
							}}
							onBlur={handleChangeOnBlur}
							onFocus={handleFocusIn}
						/>
						{isInputNumber && unit && unitPosition === 'AFTER' && (
							<span className="unit">{unit}</span>
						)}
					</div>
					{management && (
						<div className="tooltip">
							<TooltipResponse
								id={id}
								response={U.buildLocalResponse(response, value)}
							/>
						</div>
					)}
				</div>
				{isInputNumber && (
					<div className="lunatic-input-number-errors">
						{messagesError.map((m, i) => (
							<div key={i} className="error">
								{m}
							</div>
						))}
					</div>
				)}
			</div>
			<Declarations
				id={id}
				type={C.DETACHABLE}
				declarations={declarations}
				features={features}
				bindings={bindings}
			/>
		</>
	);
};

InputDeclarationsWrapper.defaultProps = {
	label: '',
	preferences: ['COLLECTED'],
	response: {},
	placeholder: '',
	readOnly: false,
	disabled: false,
	autoComplete: false,
	labelPosition: 'DEFAULT',
	mandatory: false,
	focused: false,
	declarations: [],
	features: [],
	bindings: {},
	management: false,
	style: {},
	validators: [],
	isInputNumber: false,
};

InputDeclarationsWrapper.propTypes = {
	id: PropTypes.string.isRequired,
	label: PropTypes.string,
	preferences: PropTypes.arrayOf(U.valueTypePropTypes),
	response: U.responsePropTypes,
	min: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
	max: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
	decimals: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
	placeholder: PropTypes.string,
	handleChange: PropTypes.func.isRequired,
	readOnly: PropTypes.bool,
	disabled: PropTypes.bool,
	maxLength: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
	autoComplete: PropTypes.bool,
	labelPosition: PropTypes.oneOf(['DEFAULT', 'TOP', 'BOTTOM', 'LEFT', 'RIGHT']),
	unitPosition: PropTypes.oneOf(['DEFAULT', 'BEFORE', 'AFTER']),
	mandatory: PropTypes.bool,
	focused: PropTypes.bool,
	declarations: U.declarationsPropTypes,
	features: PropTypes.arrayOf(PropTypes.string),
	bindings: PropTypes.object,
	management: PropTypes.bool,
	style: PropTypes.object,
	type: PropTypes.oneOf(['text', 'date', 'number', null]),
	roleType: PropTypes.oneOf([
		'input',
		'datepicker',
		'input-number',
		'textarea',
	]),
	validators: PropTypes.arrayOf(PropTypes.func),
	isInputNumber: PropTypes.bool,
};

export default InputDeclarationsWrapper;

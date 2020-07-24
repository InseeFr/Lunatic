import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { debounce } from 'debounce';
import Declarations from '../declarations';
import { TooltipResponse } from '../tooltip';
import * as U from '../../utils/lib';
import * as C from '../../constants';
import { interpret } from '../../utils/to-expose';
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
	disabled,
	autoComplete,
	focused,
	style,
	unit,
	labelPosition,
	unitPosition,
	declarations,
	features,
	bindings,
	management,
	mandatory,
	validators,
}) => {
	const inputRef = useRef();

	const [value, setValue] = useState(() =>
		U.getResponseByPreference(preferences)(response)
	);
	const [messagesError, setMessagesError] = useState(
		[minMaxValidator({ min, max }), ...validators]
			.map((v) => v(value))
			.filter((m) => m !== undefined)
	);

	const onChange = debounce((v) => {
		handleChange({
			[U.getResponseName(response)]: v,
		});
	}, 200);

	const validate = (value) => {
		setMessagesError(
			[minMaxValidator({ min, max }), ...validators]
				.map((v) => v(value))
				.filter((m) => m !== undefined)
		);
	};

	useEffect(() => {
		if (focused) inputRef.current.focus();
	}, [focused]);

	useEffect(() => {
		setMessagesError(
			[minMaxValidator({ min, max }), ...validators]
				.map((v) => v(value))
				.filter((m) => m !== undefined)
		);
	}, [value, min, max, validators]);

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
				<label
					htmlFor={`input-${id}`}
					id={`input-label-${id}`}
					className={`${mandatory ? 'mandatory' : ''}`}
				>
					{interpret(features)(bindings)(label)}{' '}
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
					features={features}
					bindings={bindings}
				/>
				<div className="field-container">
					<div className={`${management ? 'field-with-tooltip' : 'field'}`}>
						<input
							type="number"
							id={`input-${id}`}
							ref={inputRef}
							aria-labelledby={`input-label-${id}`}
							value={value}
							min={min}
							max={max}
							step={decimals ? `${Math.pow(10, -decimals)}` : '0'}
							placeholder={placeholder}
							className={`input-lunatic ${
								messagesError.length > 0 ? 'warning' : ''
							}`}
							style={U.buildStyleObject(style)}
							readOnly={readOnly}
							disabled={disabled}
							autoComplete={autoComplete ? 'on' : 'off'}
							required={mandatory}
							aria-required={mandatory}
							onChange={(e) => {
								const {
									target: { value: v },
								} = e;
								validate(v);
								setValue(v);
								onChange(v);
							}}
						/>
						{unitPosition === 'AFTER' && <span className="unit">{unit}</span>}
					</div>
					{management && (
						<div className="tooltip">
							<TooltipResponse id={id} response={response} />
						</div>
					)}
				</div>
				<div className="lunatic-input-number-errors">
					{messagesError.map((m, i) => (
						<div key={i} className="error">
							{m}
						</div>
					))}
				</div>
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

const minMaxValidator = ({ min, max }) => (value) => {
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

const isDef = (number) => number || number === 0;

InputNumber.defaultProps = {
	label: '',
	preferences: ['COLLECTED'],
	response: {},
	min: undefined,
	max: undefined,
	decimals: 0,
	placeholder: '',
	readOnly: false,
	disabled: false,
	autoComplete: false,
	focused: false,
	declarations: [],
	features: [],
	bindings: {},
	labelPosition: 'DEFAULT',
	unitPositioni: 'DEFAULT',
	mandatory: false,
	management: false,
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
	disabled: PropTypes.bool,
	autoComplete: PropTypes.bool,
	focused: PropTypes.bool,
	declarations: U.declarationsPropTypes,
	features: PropTypes.arrayOf(PropTypes.string),
	bindings: PropTypes.object,
	labelPosition: PropTypes.oneOf(['DEFAULT', 'TOP', 'BOTTOM', 'LEFT', 'RIGHT']),
	unitPosition: PropTypes.oneOf(['DEFAULT', 'BEFORE', 'AFTER']),
	mandatory: PropTypes.bool,
	management: PropTypes.bool,
	style: PropTypes.object,
	validators: PropTypes.arrayOf(PropTypes.func),
};

export default React.memo(InputNumber, U.areEqual);

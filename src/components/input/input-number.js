import React from 'react';
import PropTypes from 'prop-types';
import Declarations from '../declarations';
import * as C from '../../utils/constants';
import { declarationsPropTypes } from '../../utils/prop-types';
import { buildStyleObject } from '../../utils/string-utils';
import { getLabelPositionClass } from '../../utils/label-position';
import './input.scss';

class InputNumber extends React.Component {
	constructor(props) {
		super(props);
		this.state = { messagesError: [] };
		this.validators = [minMaxValidator(props)];
		if (props.validators && props.validators.length > 0) {
			this.validators = [minMaxValidator(props), ...props.validators];
		}
		this.validate = this.validate.bind(this);
	}

	validate(value) {
		const messagesError = this.validators
			.map(v => v(value))
			.filter(m => m !== undefined);
		this.setState({ messagesError });
	}

	componentDidMount() {
		const { focused } = this.props;
		if (focused) this.nameInput.focus();
	}

	render() {
		const {
			id,
			label,
			value,
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
			declarations,
			required,
		} = this.props;
		const { messagesError } = this.state;
		return (
			<React.Fragment>
				<Declarations
					id={id}
					type={C.BEFORE_QUESTION_TEXT}
					declarations={declarations}
				/>
				<div className={getLabelPositionClass(labelPosition)}>
					<label
						htmlFor={`input-${id}`}
						id={`input-label-${id}`}
						className={`${required ? 'required' : ''}`}
					>{`${label} ${unit ? `(${unit})` : ''}`}</label>
					<Declarations
						id={id}
						type={C.AFTER_QUESTION_TEXT}
						declarations={declarations}
					/>
					<input
						type="number"
						id={`input-${id}`}
						ref={input => {
							if (focused) this.nameInput = input;
						}}
						aria-labelledby={`input-label-${id}`}
						value={value}
						min={min}
						max={max}
						step={decimals ? `${Math.pow(10, -decimals)}` : '0'}
						placeholder={placeholder}
						className={`input-lunatic ${
							this.state.messagesError.length > 0 ? 'warning' : ''
						}`}
						style={buildStyleObject(style)}
						readOnly={readOnly}
						autoComplete={autoComplete ? 'on' : 'off'}
						required={required}
						aria-required={required}
						onChange={e => {
							this.validate(e.target.value);
							handleChange(e.target.value);
						}}
					/>
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
	}
}

const minMaxValidator = ({ min, max }) => value =>
	min !== undefined && max !== undefined ? (
		Number(value) < min || Number(value) > max ? (
			<span>{`La valeur doit être comprise entre ${min} et ${max}`}</span>
		) : (
			undefined
		)
	) : (
		undefined
	);

InputNumber.defaultProps = {
	min: 0,
	max: Number.MAX_SAFE_INTEGER,
	label: '',
	placeholder: '',
	readOnly: false,
	autoComplete: false,
	labelPosition: 'DEFAULT',
	required: false,
	focused: false,
	declarations: [],
};

InputNumber.propTypes = {
	id: PropTypes.string.isRequired,
	label: PropTypes.string,
	value: PropTypes.string,
	min: PropTypes.number,
	max: PropTypes.number,
	decimals: PropTypes.number,
	placeholder: PropTypes.string,
	handleChange: PropTypes.func.isRequired,
	readOnly: PropTypes.bool,
	autoComplete: PropTypes.bool,
	focused: PropTypes.bool,
	declarations: declarationsPropTypes,
	style: PropTypes.object,
	labelPosition: PropTypes.oneOf(['DEFAULT', 'TOP', 'BOTTOM', 'LEFT', 'RIGHT']),
	required: PropTypes.bool,
};

export default InputNumber;

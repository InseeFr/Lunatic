import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Declarations from '../declarations';
import * as C from '../../utils/constants';
import { declarationsPropTypes } from '../../utils/prop-types';
import { buildStyleObject } from '../../utils/string-utils';
import { getLabelPositionClass } from '../../utils/label-position';
import './textarea.scss';

class Textarea extends Component {
	componentDidMount() {
		const { focused } = this.props;
		if (focused) this.nameInput.focus();
	}

	render() {
		const {
			id,
			label,
			value,
			placeholder,
			handleChange,
			rows,
			maxLength,
			readOnly,
			autoComplete,
			labelPosition,
			required,
			focused,
			declarations,
			style,
		} = this.props;
		return (
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
				<textarea
					id={`textarea-${id}`}
					ref={input => {
						if (focused) this.nameInput = input;
					}}
					placeholder={placeholder}
					value={value}
					className="textarea-lunatic"
					style={buildStyleObject(style)}
					rows={rows}
					maxLength={maxLength}
					readOnly={readOnly}
					autoComplete={autoComplete ? 'on' : 'off'}
					required={required}
					aria-required={required}
					onChange={e => handleChange(e.target.value)}
				/>
				<Declarations id={id} type={C.DETACHABLE} declarations={declarations} />
			</div>
		);
	}
}

Textarea.defaultProps = {
	placeholder: '',
	rows: 5,
	readOnly: false,
	autoComplete: false,
	labelPosition: 'DEFAULT',
	required: false,
	focused: false,
	declarations: [],
};

Textarea.propTypes = {
	id: PropTypes.string,
	label: PropTypes.string,
	value: PropTypes.string,
	placeholder: PropTypes.string,
	handleChange: PropTypes.func.isRequired,
	rows: PropTypes.number.isRequired,
	maxLength: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
	readOnly: PropTypes.bool,
	autoComplete: PropTypes.bool,
	labelPosition: PropTypes.oneOf(['DEFAULT', 'TOP', 'BOTTOM', 'LEFT', 'RIGHT']),
	required: PropTypes.bool,
	focused: PropTypes.bool,
	declarations: declarationsPropTypes,
	style: PropTypes.object,
};

export default Textarea;

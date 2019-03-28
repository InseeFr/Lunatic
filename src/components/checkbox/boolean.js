import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Declarations from '../declarations';
import * as C from '../../utils/constants';
import { declarationsPropTypes } from '../../utils/prop-types';
import { buildStyleObject } from '../../utils/string-utils';
import './checkbox.scss';

class CheckboxBoolean extends Component {
	constructor(props) {
		super(props);
		const { value } = props;
		this.state = { checked: value };
		this.onChange = () => {
			const checked = !this.state.checked;
			props.handleChange(checked);
			this.setState({ checked });
		};
	}
	render() {
		const { checked } = this.state;
		const {
			id,
			label,
			disabled,
			positioning,
			declarations,
			style,
		} = this.props;
		const isVertical = positioning === 'VERTICAL';
		const input = (
			<input
				type="checkbox"
				id={`checkbox-boolean-${id}`}
				title={label ? label : 'empty-label'}
				className={`checkbox-lunatic${isVertical ? '-no-margin' : ''}`}
				style={buildStyleObject(style)}
				checked={checked}
				disabled={disabled}
				onChange={this.onChange}
			/>
		);
		return (
			<div key={`checkbox-boolean-${id}`} className={`checkbox-modality`}>
				<Declarations
					id={id}
					type={C.BEFORE_QUESTION_TEXT}
					declarations={declarations}
				/>
				{label && <label htmlFor={`checkbox-boolean-${id}`}>{label}</label>}
				<Declarations
					id={id}
					type={C.AFTER_QUESTION_TEXT}
					declarations={declarations}
				/>
				{isVertical ? <div>{input}</div> : input}
				<Declarations id={id} type={C.DETACHABLE} declarations={declarations} />
			</div>
		);
	}
}

CheckboxBoolean.propTypes = {
	id: PropTypes.string.isRequired,
	label: PropTypes.string,
	value: PropTypes.bool,
	handleChange: PropTypes.func.isRequired,
	positioning: PropTypes.oneOf(['DEFAULT', 'HORIZONTAL', 'VERTICAL']),
	disabled: PropTypes.bool,
	declarations: declarationsPropTypes,
	style: PropTypes.object,
};

CheckboxBoolean.defaultProps = {
	label: '',
	value: false,
	positioning: 'DEFAULT',
	disabled: false,
	declarations: [],
	style: {},
};

export default CheckboxBoolean;

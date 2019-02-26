import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { buildStyleObject } from '../../utils/string-utils';
import './checkbox.scss';

class CheckboxBoolean extends Component {
	constructor(props) {
		super(props);
		const { value } = props;
		this.state = { checked: value === 1 ? true : false };
		this.onChange = () => {
			props.handleChange(!this.state.checked ? 1 : 0);
			this.setState({ checked: !this.state.checked });
		};
	}
	render() {
		const { checked } = this.state;
		const { id, label, disabled, positioning, style } = this.props;
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
				{label && <label htmlFor={`checkbox-boolean-${id}`}>{label}</label>}
				{isVertical ? <div>{input}</div> : input}
			</div>
		);
	}
}

CheckboxBoolean.propTypes = {
	id: PropTypes.string.isRequired,
	label: PropTypes.string,
	value: PropTypes.oneOf([0, 1]),
	handleChange: PropTypes.func.isRequired,
	positioning: PropTypes.oneOf(['DEFAULT', 'HORIZONTAL', 'VERTICAL']),
	disabled: PropTypes.bool,
	style: PropTypes.object,
};

CheckboxBoolean.defaultProps = {
	label: '',
	value: 0,
	positioning: 'DEFAULT',
	disabled: false,
	style: {},
};

export default CheckboxBoolean;

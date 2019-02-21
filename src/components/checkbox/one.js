import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Radium from 'radium';
import { buildStyleObject } from '../../utils/string-utils';
import { getItemsPositioningClass } from '../../utils/items-positioning';
import './checkbox.scss';

class CheckboxOne extends Component {
	constructor(props) {
		super(props);
		const { selectedValue, handleChange } = props;
		this.state = { selectedValue };
		this.onChange = value => {
			if (value === this.state.selectedValue) {
				handleChange('');
				this.setState({ selectedValue: '' });
			} else {
				handleChange(value);
				this.setState({ selectedValue: value });
			}
		};
	}
	render() {
		const { selectedValue } = this.state;
		const { id, label, options, positioning, disabled, style } = this.props;
		const { fieldsetStyle, checkboxStyle } = style;

		return (
			<fieldset
				key={`checkbox-one-${id}`}
				className="checkbox-group"
				style={buildStyleObject(fieldsetStyle)}
			>
				<legend>{label}</legend>
				{options.map(({ label: modLabel, value }) => {
					const checked = selectedValue === value;
					return (
						<div
							key={`checkbox-one-${id}-${value}`}
							className={`checkbox-modality ${getItemsPositioningClass(
								positioning
							)}`}
						>
							<input
								type="checkbox"
								id={`checkbox-one-${id}-${value}`}
								key={`checkbox-one-${id}-${value}`}
								aria-labelledby={`input-label-${id}-${value}`}
								className="checkbox-lunatic"
								checked={checked}
								disabled={disabled}
								onChange={() => this.onChange(value)}
							/>
							<label
								htmlFor={`checkbox-one-${id}-${value}`}
								id={`input-label-${id}-${value}`}
								style={checked ? buildStyleObject(checkboxStyle) : {}}
							>
								{modLabel}
							</label>
						</div>
					);
				})}
			</fieldset>
		);
	}
}

CheckboxOne.propTypes = {
	id: PropTypes.string.isRequired,
	label: PropTypes.string,
	options: PropTypes.arrayOf(
		PropTypes.shape({
			label: PropTypes.string.isRequired,
			value: PropTypes.string.isRequired,
		})
	).isRequired,
	selectedValue: PropTypes.string,
	handleChange: PropTypes.func.isRequired,
	positioning: PropTypes.oneOf(['DEFAULT', 'HORIZONTAL', 'VERTICAL']),
	disabled: PropTypes.bool,
	style: PropTypes.object,
};

CheckboxOne.defaultProps = {
	label: '',
	selectedValue: '',
	positioning: 'DEFAULT',
	disabled: false,
	style: { fieldsetStyle: {}, checkboxStyle: {} },
};

export default Radium(CheckboxOne);

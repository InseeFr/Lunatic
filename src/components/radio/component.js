import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Radium from 'radium';
import Declarations from '../declarations';
import * as C from '../../utils/constants';
import { declarationsPropTypes } from '../../utils/prop-types';
import { buildStyleObject } from '../../utils/string-utils';
import { getItemsPositioningClass } from '../../utils/items-positioning';
import './radio.scss';

class Radio extends Component {
	constructor(props) {
		super(props);
		const { selectedValue, handleChange } = props;
		this.state = { selectedValue };
		this.onChange = selectedValue => {
			handleChange(selectedValue);
			this.setState({ selectedValue });
		};
	}
	render() {
		const { selectedValue } = this.state;
		const {
			id,
			label,
			options,
			disabled,
			declarations,
			style,
			positioning,
		} = this.props;
		const { fieldsetStyle, radioStyle } = style;
		return (
			<React.Fragment>
				<Declarations
					id={id}
					type={C.BEFORE_QUESTION_TEXT}
					declarations={declarations}
				/>
				<fieldset
					key={`radio-${id}`}
					className="radio-group"
					style={buildStyleObject(fieldsetStyle)}
				>
					<legend>{label}</legend>
					<Declarations
						id={id}
						type={C.AFTER_QUESTION_TEXT}
						declarations={declarations}
					/>
					{options.map(({ label: modLabel, value }) => {
						const checked = selectedValue === value;
						return (
							<div
								key={`radio-${id}-${value}`}
								className={`radio-modality ${getItemsPositioningClass(
									positioning
								)}`}
							>
								<input
									type="radio"
									name={`radio-${id}`}
									id={`radio-${id}-${value}`}
									aria-labelledby={`input-label-${id}-${value}`}
									className="radio-lunatic"
									style={buildStyleObject(style)}
									checked={selectedValue === value}
									disabled={disabled}
									onChange={() => this.onChange(value)}
								/>
								<label
									htmlFor={`radio-${id}-${value}`}
									id={`input-label-${id}-${value}`}
									style={checked ? buildStyleObject(radioStyle) : {}}
								>
									{modLabel}
								</label>
							</div>
						);
					})}
				</fieldset>
				<Declarations id={id} type={C.DETACHABLE} declarations={declarations} />
			</React.Fragment>
		);
	}
}

Radio.propTypes = {
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
	declarations: declarationsPropTypes,
	style: PropTypes.object,
};

Radio.defaultProps = {
	label: '',
	selectedValue: '',
	positioning: 'DEFAULT',
	disabled: false,
	declarations: [],
	style: { fieldsetStyle: {}, radioStyle: {} },
};

export default Radium(Radio);

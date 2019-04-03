import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Radium from 'radium';
import { hotkeys } from 'react-keyboard-shortcuts';
import Declarations from '../declarations';
import * as C from '../../utils/constants';
import { declarationsPropTypes } from '../../utils/prop-types';
import { buildStyleObject } from '../../utils/string-utils';
import { getItemsPositioningClass } from '../../utils/items-positioning';
import alphabet from '../../utils/alphabet';
import './checkbox.scss';

class CheckboxOne extends Component {
	hot_keys = this.props.keyboardSelection
		? this.props.options.reduce(
				(_, { value }, i) => ({
					..._,
					[alphabet[i]]: { priority: 1, handler: () => this.onChange(value) },
				}),
				{}
		  )
		: {};

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
		const {
			id,
			label,
			options,
			positioning,
			disabled,
			keyboardSelection,
			declarations,
			style,
		} = this.props;
		const { fieldsetStyle, checkboxStyle } = style;

		return (
			<React.Fragment>
				<Declarations
					id={id}
					type={C.BEFORE_QUESTION_TEXT}
					declarations={declarations}
				/>
				<fieldset
					key={`checkbox-one-${id}`}
					className="checkbox-group"
					style={buildStyleObject(fieldsetStyle)}
				>
					<legend>{label}</legend>
					<Declarations
						id={id}
						type={C.AFTER_QUESTION_TEXT}
						declarations={declarations}
					/>
					{options.map(({ label: modLabel, value }, i) => {
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
									{keyboardSelection
										? `${alphabet[i].toUpperCase()} - ${modLabel}`
										: modLabel}
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
	keyboardSelection: PropTypes.bool,
	declarations: declarationsPropTypes,
	style: PropTypes.object,
};

CheckboxOne.defaultProps = {
	label: '',
	selectedValue: '',
	positioning: 'DEFAULT',
	disabled: false,
	keyboardSelection: false,
	declarations: [],
	style: { fieldsetStyle: {}, checkboxStyle: {} },
};

export default Radium(hotkeys(CheckboxOne));

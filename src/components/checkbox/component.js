import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Declarations from '../declarations';
import * as C from '../../utils/constants';
import { declarationsPropTypes } from '../../utils/prop-types';
import { buildStyleObject } from '../../utils/string-utils';
import { getItemsPositioningClass } from '../../utils/options-positioning';
import alphabet from '../../utils/alphabet';
import './checkbox.scss';

class Checkbox extends Component {
	constructor(props) {
		super(props);
		const { options, handleChange } = props;
		this.state = { options };
		this.onChange = index => {
			const { options: oldItems } = this.state;
			const options = [...oldItems];
			options[index] = { ...options[index], value: !options[index].value };
			this.setState({ options });
			handleChange(options);
		};
	}

	componentDidMount() {
		const { focused } = this.props;
		if (focused) this.nameInput.focus();
	}

	render() {
		const { options } = this.state;
		const {
			id,
			label,
			positioning,
			disabled,
			keyboardSelection,
			focused,
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
					key={`checkbox-${id}`}
					className="checkbox-group"
					style={buildStyleObject(fieldsetStyle)}
				>
					<legend>{label}</legend>
					<Declarations
						id={id}
						type={C.AFTER_QUESTION_TEXT}
						declarations={declarations}
					/>
					{options.map(({ id: modId, label: modLabel, value }, i) => {
						return (
							<div
								key={`checkbox-${id}-${modId}`}
								className={`checkbox-modality ${getItemsPositioningClass(
									positioning
								)}`}
							>
								<input
									type="checkbox"
									id={`checkbox-${id}-${modId}`}
									ref={input => {
										if (focused && i === 0) this.nameInput = input;
									}}
									key={`checkbox-${id}-${modId}`}
									aria-labelledby={`input-label-${id}-${modId}`}
									className="checkbox-lunatic"
									checked={value}
									disabled={disabled}
									onChange={() => this.onChange(i)}
								/>
								<label
									htmlFor={`checkbox-${id}-${modId}`}
									id={`input-label-${id}-${modId}`}
									style={value ? buildStyleObject(checkboxStyle) : {}}
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

Checkbox.propTypes = {
	id: PropTypes.string.isRequired,
	label: PropTypes.string,
	options: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.string.isRequired,
			label: PropTypes.string.isRequired,
			value: PropTypes.bool.isRequired,
		})
	).isRequired,
	handleChange: PropTypes.func.isRequired,
	positioning: PropTypes.oneOf(['DEFAULT', 'HORIZONTAL', 'VERTICAL']),
	disabled: PropTypes.bool,
	keyboardSelection: PropTypes.bool,
	focused: PropTypes.bool,
	declarations: declarationsPropTypes,
	style: PropTypes.object,
};

Checkbox.defaultProps = {
	label: '',
	options: [],
	positioning: 'DEFAULT',
	disabled: false,
	keyboardSelection: false,
	focused: false,
	declarations: [],
	style: { fieldsetStyle: {}, checkboxStyle: {} },
};

export default Checkbox;

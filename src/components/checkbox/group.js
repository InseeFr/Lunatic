import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Declarations from '../declarations';
import * as U from '../../utils/lib';
import * as C from '../../utils/constants';
import './checkbox.scss';

class CheckboxGroup extends Component {
	constructor(props) {
		super(props);
		const { responses, handleChange } = props;
		this.state = { responses };
		this.onChange = index => {
			const { responses: oldItems } = this.state;
			const responses = [...oldItems];
			responses[index] = {
				...responses[index],
				value: !responses[index].value,
			};
			this.setState({ responses });
			handleChange(responses);
		};
	}

	componentDidMount() {
		const { focused } = this.props;
		if (focused) this.nameInput.focus();
	}

	render() {
		const { responses } = this.state;
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
					style={U.buildStyleObject(fieldsetStyle)}
				>
					<legend>{label}</legend>
					<Declarations
						id={id}
						type={C.AFTER_QUESTION_TEXT}
						declarations={declarations}
					/>
					{responses.map(({ id: modId, label: modLabel, value }, i) => {
						return (
							<div
								key={`checkbox-${id}-${modId}`}
								className={`checkbox-modality ${U.getItemsPositioningClass(
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
									style={value ? U.buildStyleObject(checkboxStyle) : {}}
								>
									{keyboardSelection
										? `${U.getAlphabet()[i].toUpperCase()} - ${modLabel}`
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

CheckboxGroup.propTypes = {
	id: PropTypes.string.isRequired,
	label: PropTypes.string,
	responses: PropTypes.arrayOf(
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
	declarations: U.declarationsPropTypes,
	style: PropTypes.object,
};

CheckboxGroup.defaultProps = {
	label: '',
	responses: [],
	positioning: 'DEFAULT',
	disabled: false,
	keyboardSelection: false,
	focused: false,
	declarations: [],
	style: { fieldsetStyle: {}, checkboxStyle: {} },
};

export default CheckboxGroup;

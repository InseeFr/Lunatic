import React from 'react';
import { selectCommonPropTypes } from './prop-types';
import classnames from 'classnames';
import SelectBase from '../shared/select-base.component';
import './simple-select.scss';

class SimpleSelect extends React.Component {
	state = { expanded: false, value: null, label: null };

	constructor(props) {
		super(props);
		if (props.value) {
			this.state.value = props.value;
		}
	}

	handleClick = () => {
		this.setState({ expanded: !this.state.expanded });
	};

	setValue = (value, label) => {
		this.setState({ value, label });
		if (this.props.handleChange) {
			this.props.handleChange(value);
		}
		return false;
	};

	render() {
		const { expanded, value, label } = this.state;
		const {
			className,
			children,
			name,
			readOnly,
			placeHolder,
			options,
			...rest
		} = this.props;
		return (
			<SelectBase
				id="simple-select"
				options={children}
				expanded={expanded}
				readOnly={readOnly}
				value={value}
				placeHolder={placeHolder ? placeHolder : 'Veuillez ...'}
				setExpanded={expanded => this.setState({ expanded })}
				setValue={this.setValue}
				className={classnames('simple-select', { [className]: className })}
				{...rest}
			>
				<button
					aria-haspopup="listbox"
					className={classnames('bouton', { 'read-only': readOnly })}
					aria-expanded={expanded ? true : undefined}
					onClick={this.handleClick}
					readOnly={readOnly ? true : undefined}
					name={name}
				>
					{label || placeHolder || 'Veuillez....'}
				</button>
			</SelectBase>
		);
	}
}

SimpleSelect.propTypes = {
	...selectCommonPropTypes,
};

export default SimpleSelect;

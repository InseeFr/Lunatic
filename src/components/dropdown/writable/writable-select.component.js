import React from 'react';
import classnames from 'classnames';
import SelectBase from '../shared/select-base.component';
import PropTypes from 'prop-types';
import './writable-select.scss';

class WritableSelect extends React.Component {
	state = { expanded: false, value: null, label: null, prefix: null };

	constructor(props) {
		super(props);
		if (props.value) {
			this.state.value = props.value;
		}
	}

	delete = () =>
		this.setState({ expanded: true, prefix: null, value: null, label: null });

	expandPanel = e => {
		e.stopPropagation();
		this.setState({ expanded: !this.state.expanded });
	};

	setValue = (value, label) => {
		this.setState({ value, label, prefix: null });
		if (this.props.handleChange) {
			this.props.handleChange(value);
		}
		return false;
	};

	onFocusInput = () => this.setState({ expanded: true });

	setExpanded = expanded => {
		this.setState({ expanded });
	};

	handleChangeInput = e => {
		this.setState({
			label: e.target.value,
			value: e.target.value,
			expanded: true,
			prefix: e.target.value,
		});
		this.props.handleChange(e.target.value);
	};

	render() {
		const { expanded, value, label, prefix } = this.state;
		const { children, className, placeHolder, readOnly, ...rest } = this.props;
		return (
			<SelectBase
				id="writable-select"
				prefix={prefix}
				options={children}
				expanded={expanded}
				readOnly={readOnly}
				value={value}
				placeHolder={placeHolder ? placeHolder : 'Veuillez ...'}
				setExpanded={this.setExpanded}
				setValue={this.setValue}
				className={classnames('writable-select', { [className]: className })}
				{...rest}
			>
				<span className="champ-saisie">
					<input
						type="text"
						placeholder={placeHolder || 'Veuillez...'}
						value={label || ''}
						onChange={this.handleChangeInput}
						onFocus={this.onFocusInput}
					/>
					{value ? (
						<button className="button-delete" onClick={this.delete} />
					) : null}
					<button
						className={classnames('button-expand', {
							'arrow-up': expanded,
							'arrow-down': !expanded,
						})}
						onClick={this.expandPanel}
					/>
				</span>
			</SelectBase>
		);
	}
}

WritableSelect.propTypes = {
	value: PropTypes.object,
	handleChange: PropTypes.func,
	className: PropTypes.string,
	placeHolder: PropTypes.string,
	readOnly: PropTypes.bool,
};

export default WritableSelect;

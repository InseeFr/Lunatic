import React, { useReducer, useRef } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import * as actions from '../commons/actions';
import Panel from '../commons/components/panel';
import DropdownContainer from '../commons/components/dropdown-container';
import { preparePrefix } from './prefix-tools';
import reducer, { initial } from '../commons/reducer';
import Option from './option';
import Icone from './icone';

/* **/
const isDisplay = ({ visible, visibleOptions }) =>
	visible && visibleOptions.length > 0;

/** */
const onChangeCallback = (state, dispatch) => (e) => {
	e.stopPropagation();
	e.preventDefault();
	dispatch(actions.setValue(e.target.value));
	dispatch(actions.setPrefix(preparePrefix(e.target.value)));
};

/** */
const createOnSelect = (_, dispatch, onSelect) => (option) => {
	dispatch(actions.setSelectedOption(option));
	dispatch(actions.hidePanel());
	onSelect(option);
};

/**
 *
 * @param {props}
 */
const Dropdown = ({
	options = [],
	onSelect,
	response,
	className,
	placeholder,
	label,
	labelPosition,
	mandatory,
	value: valueFromProps,
	zIndex,
	management,
	disabled,
	focused: initFocused,
}) => {
	const [state, dispatch] = useReducer(reducer, {
		...initial,
		id: `dropdown-${new Date().getMilliseconds()}`,
		disabled,
		focused: initFocused,
	});
	const {
		prefix,
		visible,
		activeIndex,
		visibleOptions,
		value,
		focused,
		id,
	} = state;
	const inputEl = useRef();
	const containerEl = useRef();
	const onSelect_ = createOnSelect(state, dispatch, onSelect);
	const selectedOption = options.find((o) => o.value === value);
	return (
		<DropdownContainer
			className={className || 'lunatic-dropdown'}
			state={state}
			ref={containerEl}
			dispatch={dispatch}
			options={options}
			label={label}
			labelPosition={labelPosition}
			mandatory={mandatory}
			response={response}
			onSelect={onSelect_}
			value={valueFromProps}
			zIndex={zIndex}
			management={management}
		>
			<div
				className={classnames('lunatic-dropdown-input', { focused, disabled })}
			>
				<input
					type="text"
					ref={inputEl}
					value={value || ''}
					disabled={disabled}
					placeholder={placeholder}
					autoComplete="list"
					autoCorrect="off"
					autoCapitalize="off"
					spellCheck="false"
					tabIndex="-1"
					onChange={onChangeCallback(state, dispatch)}
				/>
			</div>
			<Icone
				prefix={prefix}
				visible={visible}
				disabled={disabled}
				onDelete={(e) => {
					e.stopPropagation();
					inputEl.current.value = '';
					dispatch(actions.resetSelection());
					onSelect_({ value: null });
				}}
				onSwitch={(e) => {
					e.stopPropagation();
					e.preventDefault();
					if (visible) {
						dispatch(actions.hidePanel());
					} else {
						dispatch(actions.showPanel());
						containerEl.current.focus();
					}
				}}
			/>
			<div
				tabIndex="-1"
				className={classnames('lunatic-transition', {
					visible: isDisplay(state),
				})}
			>
				<Panel
					idDropdown={id}
					options={visibleOptions}
					display={isDisplay(state) && !disabled}
					prefix={prefix}
					activeIndex={activeIndex}
					optionComponent={Option}
					selectedOption={selectedOption}
					onSelect={onSelect_}
					handleActive={(index) => dispatch(actions.setActiveOption(index))}
				/>
			</div>
		</DropdownContainer>
	);
};

Dropdown.propTypes = {
	zIndex: PropTypes.number,
	disabled: PropTypes.bool,
	focused: PropTypes.bool,
	className: PropTypes.string,
	id: PropTypes.string,
	options: PropTypes.array.isRequired,
	onSelect: PropTypes.func,
	placeholder: PropTypes.string,
	value: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number,
		PropTypes.bool,
	]),
};

Dropdown.defaultProps = {
	options: [],
	zIndex: 0,
	onSelect: () => null,
	placeholder: 'Search...',
	disabled: false,
	focused: false,
};

export default Dropdown;

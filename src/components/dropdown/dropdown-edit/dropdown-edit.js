import React, { useReducer, useRef } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import * as actions from '../commons/actions';
import Panel from '../commons/components/panel';
import DropdownContainer from '../commons/components/dropdown-container';
import { preparePrefix } from './prefix-tools';
import reducer, { initial } from './reducer';
import Option from './option';
import Icone from './icone';
import '../themes/lunatic-dropdown-default.scss';

/* **/
const isDisplay = ({ visible, visibleOptions }) =>
	visible && visibleOptions.length > 0;

/** */
const onChangeCallback = (state, dispatch) => e => {
	e.stopPropagation();
	e.preventDefault();
	dispatch(actions.setValue(e.target.value));
	dispatch(actions.setPrefix(preparePrefix(e.target.value)));
};

/** */
const createOnSelect = (_, dispatch, onSelect) => option => {
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
	className,
	placeHolder,
	label,
	value: valueFromProps,
	zIndex,
	disabled,
}) => {
	const [state, dispatch] = useReducer(reducer, {
		...initial,
		id: `dropdown-${new Date().getMilliseconds()}`,
		disabled,
	});
	const {
		prefix,
		visible,
		activeIndex,
		visibleOptions,
		selectedOption,
		value,
		focused,
		id,
	} = state;
	const inputEl = useRef();
	const onSelect_ = createOnSelect(state, dispatch, onSelect);
	return (
		<DropdownContainer
			className={className || 'lunatic-dropdown'}
			state={state}
			dispatch={dispatch}
			options={options}
			label={label}
			onSelect={onSelect_}
			value={valueFromProps}
			zIndex={zIndex}
		>
			<div
				className={classnames('lunatic-dropdown-input', { focused, disabled })}
			>
				<input
					type="text"
					ref={inputEl}
					value={value}
					disabled={disabled}
					placeholder={placeHolder}
					autoComplete="list"
					autoCorrect="off"
					autoCapitalize="off"
					spellCheck="false"
					tabIndex="0"
					onFocus={() => {
						dispatch(actions.setFocused(true && !disabled));
					}}
					onChange={onChangeCallback(state, dispatch)}
				/>
			</div>
			<Icone
				prefix={prefix}
				visible={visible}
				disabled={disabled}
				onDelete={e => {
					e.stopPropagation();
					inputEl.current.value = '';
					dispatch(actions.resetSelection());
				}}
				onSwitch={e => {
					e.stopPropagation();
					if (visible) {
						dispatch(actions.hidePanel());
					} else dispatch(actions.showPanel());
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
					handleActive={index => dispatch(actions.setActiveOption(index))}
				/>
			</div>
		</DropdownContainer>
	);
};

Dropdown.propTypes = {
	zIndex: PropTypes.number,
	disabled: PropTypes.bool,
	className: PropTypes.string,
	id: PropTypes.string,
	options: PropTypes.array.isRequired,
	onSelect: PropTypes.func,
	placeHolder: PropTypes.string,
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
	placeHolder: 'Search...',
	disabled: false,
};

export default Dropdown;

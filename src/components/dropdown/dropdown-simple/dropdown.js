import React, { useReducer } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import * as actions from '../commons/actions';
import Panel from '../commons/components/panel';
import ClosedIcon from '../commons/components/closed.icon';
import OpenedIcon from '../commons/components/opened.icon';
import DropdownContainer from '../commons/components/dropdown-container';
import reducer, { initial } from './reducer';
import Option from './option';

const Dropdown = ({
	id: initId,
	label,
	value,
	options,
	response,
	onSelect,
	placeHolder,
	disabled,
	mandatory,
	labelPosition,
	tooltip,
	className,
	zIndex,
}) => {
	const [state, dispatch] = useReducer(reducer, {
		...initial,
		id: `dropdown-${initId}-${new Date().getMilliseconds()}`,
		disabled,
	});
	const { focused, selectedOption, visible, activeIndex, id } = state;
	const onSelect_ = createOnSelect(state, dispatch, onSelect);
	return (
		<DropdownContainer
			className={className || 'lunatic-dropdown'}
			state={state}
			dispatch={dispatch}
			options={options}
			response={response}
			tooltip={tooltip}
			label={label}
			labelPosition={labelPosition}
			mandatory={mandatory}
			onSelect={onSelect_}
			value={value}
			zIndex={zIndex}
			tooltip={tooltip}
		>
			<span className={classnames('lunatic-dropdown-input', { focused })}>
				<input
					type="button"
					disabled={disabled}
					value={selectedOption ? selectedOption.label : placeHolder || ''}
				/>
			</span>
			{getIcon(state, dispatch)(visible)}
			<div
				tabIndex="-1"
				className={classnames('lunatic-transition', {
					visible: isDisplay(state),
				})}
			>
				<Panel
					idDropdown={id}
					options={options}
					display={isDisplay(state)}
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
	disabled: PropTypes.bool,
	zIndex: PropTypes.number,
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
	disabled: false,
	options: [],
	zIndex: 0,
	onSelect: () => null,
	placeHolder: 'Search...',
};

export default Dropdown;

/* **/
const isDisplay = ({ visible, options }) => visible && options.length > 0;

/** */
const getIcon = ({ disabled }, dispatch) => visible => {
	if (disabled) {
		return (
			<span className="lunatic-icone">
				<ClosedIcon width={10} height={10} />
			</span>
		);
	}
	return (
		<span
			className="lunatic-icone"
			tabIndex="-1"
			onMouseDown={e => {
				e.stopPropagation();
				e.preventDefault();
				if (visible) {
					dispatch(actions.hidePanel());
				} else {
					dispatch(actions.showPanel());
				}
			}}
		>
			{visible ? (
				<OpenedIcon width={10} height={10} />
			) : (
				<ClosedIcon width={10} height={10} />
			)}
		</span>
	);
};

const createOnSelect = (_, dispatch, onSelect) => option => {
	dispatch(actions.setSelectedOption(option));
	dispatch(actions.hidePanel());
	onSelect(option);
};

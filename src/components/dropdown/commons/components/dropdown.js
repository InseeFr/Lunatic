import React, { useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Label from './label';
import * as U from '../../../../utils/lib';
import * as CLEAN from '../cleaner-callbacks';
import * as actions from '../actions';
import DropdownField from './dropdown-field';
import DropdownContainer from './dropdown-container';
import {
	createOnKeyDownCallback,
	createOnMouseDownCallback,
	BINDED_KEYS,
} from '../event-callbacks';

/** */
function stopAndPrevent(e) {
	e.preventDefault();
	e.stopPropagation();
}

/** */
function prepareOptions(options, valueFromProps) {
	return options.reduce(
		(a, o, i) =>
			o.value === valueFromProps && a.index === -1
				? { index: i, option: o }
				: a,
		{ index: -1, option: {} }
	);
}

/** */
function onKeyDownCallbackProxy(state, dispatch, onSelect) {
	const callback = createOnKeyDownCallback(state, dispatch, onSelect);
	return function (e) {
		switch (e.key) {
			case BINDED_KEYS.enter:
			case BINDED_KEYS.arrowUp:
			case BINDED_KEYS.arrowDown:
				stopAndPrevent(e);
				callback(e.key);
				break;
			case BINDED_KEYS.tab:
				callback(e.key);
				break;
			default:
				return;
		}
		return false;
	};
}

function Dropdown({
	options,
	children,
	onSelect,
	response,
	className,
	label,
	labelPosition,
	mandatory,
	value: valueFromProps,
	management,
	state,
	dispatch,
	refs,
}) {
	const { visible, focused, id, disabled } = state;

	CLEAN.add(id, function () {
		dispatch(actions.hidePanel());
		dispatch(actions.setFocused(false));
	});
	useEffect(
		function () {
			const hook = function () {
				dispatch(actions.hidePanel());
				dispatch(actions.setFocused(false));
			};
			window.addEventListener('mousedown', hook);

			return function () {
				window.removeEventListener('mousedown', hook);
				CLEAN.clear(id);
			};
		},
		[id, dispatch]
	);

	useEffect(
		function () {
			dispatch(actions.setOptions(options));
		},
		[options, dispatch]
	);

	useEffect(
		function () {
			if (valueFromProps) {
				const { option, index } = prepareOptions(options, valueFromProps);
				dispatch(actions.setSelectedOption(option));
				dispatch(actions.setActiveOption(index));
			}
		},
		[valueFromProps, options, dispatch]
	);

	const onFocus = useCallback(
		function () {
			dispatch(actions.setFocused(true && !disabled));
		},
		[dispatch, disabled]
	);

	const onBlur = useCallback(
		function () {
			dispatch(actions.setFocused(false));
		},
		[dispatch]
	);

	const onMouseDownCallback = useCallback(
		createOnMouseDownCallback(state, dispatch),
		[state, dispatch]
	);

	const onKeyDownCallback = useCallback(
		onKeyDownCallbackProxy(state, dispatch, onSelect),
		[state, dispatch, onSelect]
	);

	return (
		<DropdownContainer
			className={classnames(className, U.getLabelPositionClass(labelPosition), {
				focused,
				disabled,
			})}
			id={id}
			onMouseDown={onMouseDownCallback}
			onKeyDown={onKeyDownCallback}
			onFocus={onFocus}
			onBlur={onBlur}
			ref={refs}
		>
			<Label content={label} focused={focused} mandatory={mandatory} />
			<DropdownField
				id={id}
				response={response}
				options={options}
				management={management}
				focused={focused}
				visible={visible}
				disabled={disabled}
			>
				{children}
			</DropdownField>
		</DropdownContainer>
	);
}

Dropdown.propTypes = {
	zIndex: PropTypes.number,
	className: PropTypes.string,
	id: PropTypes.string,
	options: PropTypes.array.isRequired,
	onSelect: PropTypes.func,
	value: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number,
		PropTypes.object,
		PropTypes.bool,
	]),
};

Dropdown.defaultProps = {
	options: [],
	onSelect: () => null,
};

export default React.forwardRef((props, ref) => (
	<Dropdown {...props} refs={ref} />
));

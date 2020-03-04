import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Label from './label';
import * as CLEAN from '../cleaner-callbacks';
import * as actions from '../actions';
import {
	onKeyDownCallback,
	onMouseDownCallback,
	BINDED_KEYS,
} from '../event-callbacks';

/** */
const stopAndPrevent = e => {
	e.preventDefault();
	e.stopPropagation();
};

/** */
const onKeyDownCallback_ = (state, dispatch, onSelect) => e => {
	switch (e.key) {
		case BINDED_KEYS.enter:
		case BINDED_KEYS.arrowUp:
		case BINDED_KEYS.arrowDown:
			stopAndPrevent(e);
			onKeyDownCallback(state, dispatch, onSelect)(e.key);
			break;
		case BINDED_KEYS.tab:
			onKeyDownCallback(state, dispatch, onSelect)(e.key);
			break;
		default:
	}
};

function getZIndex(z) {
	return z ? z : 0;
}

function DropdownContainer({
	options = [],
	children,
	onSelect,
	className,
	label,
	refs,
	value: valueFromProps,
	zIndex,
	state,
	dispatch,
	ref,
}) {
	const { visible, focused, id, disabled } = state;

	CLEAN.add(id, () => {
		dispatch(actions.hidePanel());
		dispatch(actions.setFocused(false));
	});
	useEffect(
		e => {
			const hook = e => {
				dispatch(actions.hidePanel());
				dispatch(actions.setFocused(false));
			};
			window.addEventListener('mousedown', hook);

			return () => {
				window.removeEventListener('mousedown', hook);
				CLEAN.clear(id);
			};
		},
		[id, dispatch]
	);

	useEffect(() => {
		dispatch(actions.setOptions(options));
	}, [options, dispatch]);

	useEffect(() => {
		if (valueFromProps) {
			const { option, index } = options.reduce(
				(a, o, i) =>
					o.value === valueFromProps && a.index === -1
						? { index: i, option: o }
						: a,
				{ index: -1, option: {} }
			);
			dispatch(actions.setSelectedOption(option));
			dispatch(actions.setActiveOption(index));
		}
	}, [valueFromProps, options, dispatch]);

	const z = getZIndex(zIndex);

	return (
		<div
			className={classnames(className, {
				focused,
				disabled,
			})}
			tabIndex="-1"
			id={id}
			onMouseDown={onMouseDownCallback(state, dispatch, 'id')}
			onKeyDown={onKeyDownCallback_(state, dispatch, onSelect)}
			onFocus={() => dispatch(actions.setFocused(true && !disabled))}
			onBlur={function() {
				dispatch(actions.hidePanel());
				dispatch(actions.setFocused(false));
			}}
			ref={refs}
		>
			{label ? <Label content={label} focused={focused} /> : null}
			<div
				tabIndex="-1"
				className="lunatic-dropdown-container"
				style={{ zIndex: focused ? z + 1 : z }}
			>
				<span
					className={classnames('lunatic-dropdown-content', {
						focused,
						visible,
						disabled,
					})}
				>
					{children}
				</span>
			</div>
		</div>
	);
}

DropdownContainer.propTypes = {
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

DropdownContainer.defaultProps = {
	options: [],
	zIndex: 0,
	onSelect: () => null,
};

export default React.forwardRef((props, ref) => (
	<DropdownContainer {...props} refs={ref} />
));

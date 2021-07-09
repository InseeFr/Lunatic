import React from 'react';
import OpenedIcon from '../../../utils/icons/opened.icon';
import CrossIcon from '../../../utils/icons/cross.icon';
import ClosedIcon from '../../../utils/icons/closed.icon';

/** */
const getIcon = (visible) =>
	visible ? (
		<OpenedIcon className="lunatic-icon" width={16} height={16} />
	) : (
		<ClosedIcon className="lunatic-icon" width={16} height={16} />
	);

const Icon = ({ prefix, visible, disabled, onDelete, onSwitch }) => {
	if (disabled) {
		return (
			<span tabIndex="-1" onMouseDown={onSwitch}>
				<ClosedIcon className="lunatic-icon" width={16} height={16} />
			</span>
		);
	}
	return prefix && prefix.length > 0 ? (
		<span tabIndex="-1" onMouseDown={onDelete}>
			<CrossIcon className="lunatic-icon" width={16} height={16} />
		</span>
	) : (
		<span tabIndex="-1" onMouseDown={onSwitch}>
			{getIcon(visible)}
		</span>
	);
};

export default Icon;

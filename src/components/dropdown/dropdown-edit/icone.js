import React from 'react';
import OpenedIcon from '../../../utils/icons/opened.icon';
import CrossIcon from '../../../utils/icons/cross.icon';
import ClosedIcon from '../../../utils/icons/closed.icon';

/** */
const getIcon = (visible) =>
	visible ? (
		<OpenedIcon width={10} height={10} />
	) : (
		<ClosedIcon width={10} height={10} />
	);

const Icon = ({ prefix, visible, disabled, onDelete, onSwitch }) => {
	if (disabled) {
		return (
			<span className="lunatic-icon" tabIndex="-1" onMouseDown={onSwitch}>
				<ClosedIcon width={10} height={10} />
			</span>
		);
	}
	return prefix && prefix.length > 0 ? (
		<span className="lunatic-icon" tabIndex="-1" onMouseDown={onDelete}>
			<CrossIcon width={10} height={10} />
		</span>
	) : (
		<span className="lunatic-icon" tabIndex="-1" onMouseDown={onSwitch}>
			{getIcon(visible)}
		</span>
	);
};

export default Icon;

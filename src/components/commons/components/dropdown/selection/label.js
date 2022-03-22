import React from 'react';
import classnames from 'classnames';
import DefaultLabelRenderer from './default-label-renderer';

function Label({
	labelRenderer: Renderer = DefaultLabelRenderer,
	placeholder,
	selectedIndex,
	options,
	search,
	disabled,
}) {
	const option =
		selectedIndex !== undefined ? options[selectedIndex] : undefined;

	return (
		<div
			className={classnames('lunatic-dropdown-selected', {
				disabled,
			})}
			tabIndex="-1"
		>
			<Renderer option={option} placeholder={placeholder} search={search} />
		</div>
	);
}

export default Label;

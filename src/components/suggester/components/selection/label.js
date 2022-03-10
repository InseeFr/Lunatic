import React from 'react';
import classnames from 'classnames';
import DefaultLabelRenderer from './default-label-renderer';

function Label({
	labelRenderer: Renderer = DefaultLabelRenderer,
	placeholderList,
	displayLabel,
	expended,
	selectedIndex,
	options,
	search,
	disabled,
}) {
	const displayed = displayLabel || !expended;
	const option =
		selectedIndex !== undefined ? options[selectedIndex] : undefined;

	return (
		<div
			className={classnames('lunatic-suggester-selected', {
				displayed,
				disabled,
			})}
			tabIndex="-1"
		>
			<Renderer
				option={option}
				placeholderList={placeholderList}
				search={search}
			/>
		</div>
	);
}

export default Label;

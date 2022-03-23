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
	labelledBy,
	display,
	editable,
}) {
	if (display) {
		const option =
			selectedIndex !== undefined ? options[selectedIndex] : undefined;

		return (
			<div
				className={classnames('lunatic-combo-box-selected', {
					disabled,
				})}
				aria-labelledby={labelledBy}
				tabIndex={editable ? undefined : '0'}
			>
				<Renderer option={option} placeholder={placeholder} search={search} />
			</div>
		);
	}
	return null;
}

export default Label;

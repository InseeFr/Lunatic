import React from 'react';
import classnames from 'classnames';
import displayLabelOrInput from './displayLabelOrInput';

function Label({
	labelRenderer: Renderer,
	placeholder,
	selectedIndex,
	options,
	search,
	disabled,
	labelledBy,
}) {
	const option =
		selectedIndex !== undefined ? options[selectedIndex] : undefined;

	return (
		<div
			className={classnames('lunatic-combo-box-selected', {
				disabled,
			})}
			aria-labelledby={labelledBy}
		>
			<Renderer option={option} placeholder={placeholder} search={search} />
		</div>
	);
}

export default displayLabelOrInput(Label);

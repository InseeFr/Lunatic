import React, { useContext } from 'react';
import classnames from 'classnames';
import { SuggesterContext } from '../../state-management';
import DefaultLabelRenderer from './default-label-renderer';

function Label({
	labelRenderer: Renderer = DefaultLabelRenderer,
	placeholder,
}) {
	const [state] = useContext(SuggesterContext);
	const { displayLabel, expended, selectedIndex, options, search } = state;
	const displayed = displayLabel || !expended;

	const option =
		selectedIndex !== undefined ? options[selectedIndex] : undefined;

	return (
		<div
			className={classnames('lunatic-suggester-selected', { displayed })}
			onClick={() => console.log('ici')}
			tabIndex="-1"
		>
			<Renderer option={option} placeholder={placeholder} search={search} />
		</div>
	);
}

export default Label;

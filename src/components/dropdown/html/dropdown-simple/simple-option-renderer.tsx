import React from 'react';
import classnames from 'classnames';
import { ComboBoxOption } from '../../../commons/components/combo-box/combo-box.type';

type Props = {
	option: ComboBoxOption;
	selected?: boolean;
};

function SimpleOptionRenderer({ option, selected }: Props) {
	const { value, label } = option;

	if (label && typeof label === 'string' && label.length) {
		return (
			<div className={classnames('lunatic-dropdown-option', { selected })}>
				<span className="id">{value}</span>
				<span>&nbsp;&#x2014;&nbsp;</span>
				<span className="label">{label}</span>
			</div>
		);
	}
	return (
		<div className={classnames('lunatic-dropdown-option', { selected })}>
			<span className="id">{label}</span>
		</div>
	);
}

export default SimpleOptionRenderer;

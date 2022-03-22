import React from 'react';
import classnames from 'classnames';

export default ({ label, active, selected }) => {
	return (
		<span
			className={classnames('lunatic-dropdown-option', {
				'lunatic-dropdown-option-active': active,
				'lunatic-dropdown-option-selected': selected,
			})}
		>
			{label}
		</span>
	);
};

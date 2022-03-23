import React from 'react';
import classnames from 'classnames';

function PanelContainer({ children, focused, expended, id }) {
	return (
		<ul
			id={id}
			aria-label="suggestions"
			className={classnames('lunatic-combo-box-panel', {
				focused,
				expended,
			})}
			role="listbox"
		>
			{children}
		</ul>
	);
}

export default PanelContainer;

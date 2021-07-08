import React from 'react';
import classnames from 'classnames';

function PanelContainer({ children, focused, expended, id }) {
	return (
		<ul
			id={id}
			tabIndex="-1"
			aria-label="suggestions"
			className={classnames('lunatic-suggester-panel', {
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

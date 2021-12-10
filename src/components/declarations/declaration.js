import React from 'react';

function Declaration({ children, type }) {
	return (
		<div className={`declaration-lunatic declaration-${type.toLowerCase()}`}>
			{children}
		</div>
	);
}

export default Declaration;

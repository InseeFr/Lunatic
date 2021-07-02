import React from 'react';

function Progress({ display, percent = 0 }) {
	if (display) {
		return <div>{`${Math.round(percent)}%`}</div>;
	}
	return null;
}

export default Progress;

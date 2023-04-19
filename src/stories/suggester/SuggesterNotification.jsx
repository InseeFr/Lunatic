import React from 'react';

const STATUS = {
	unused: 0,
	idle: 1,
	pending: 2,
	success: 3,
	unknown: 4,
	error: 5,
};

export function SuggesterNotification(props) {
	const { children, status } = props;
	return (
		<>
			<div>{`status : ${status}`}</div>
			{children}
		</>
	);
}

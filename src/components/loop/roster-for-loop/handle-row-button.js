import React from 'react';
import { Button } from '../..';

function HandleRowButton({ onClick, disabled, children }) {
	return (
		<Button onClick={onClick} disabled={disabled}>
			{children}
		</Button>
	);
}

export default HandleRowButton;

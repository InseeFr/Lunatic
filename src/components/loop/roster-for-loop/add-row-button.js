import React from 'react';
import { Button } from '../../../components';

function AddRowButton({ onClick, disabled, children }) {
	return (
		<Button onClick={onClick} disabled={disabled}>
			{children}
		</Button>
	);
}

export default AddRowButton;

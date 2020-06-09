import React from 'react';
import { ListDeclarationsWrapper } from '../declarations/wrappers';
import { areEqual } from '../../utils/lib';
import './checkbox.scss';

const CheckboxOne = (props) => {
	const specificHandleChange = (e) => {
		const {
			preferences,
			response: { values },
			handleChange,
		} = props;
		const [key, value] = Object.entries(e)[0];
		if (values[preferences[preferences.length - 1]] === value)
			handleChange({ [key]: null });
		else handleChange(e);
	};
	return (
		<ListDeclarationsWrapper
			type="checkbox"
			{...props}
			handleChange={specificHandleChange}
		/>
	);
};

export default React.memo(CheckboxOne, areEqual);

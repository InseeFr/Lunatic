import React from 'react';
import InputNumber from './input-number';
import {
	createCustomizableLunaticField,
	createLunaticComponent,
	Errors,
} from '../commons';

const LunaticInputNumber = ({ errors, ...props }) => {
	const { id } = props;
	return (
		<>
			<InputNumber {...props} />
			<Errors errors={errors} activeId={id} />
		</>
	);
};

export default createLunaticComponent(
	createCustomizableLunaticField(LunaticInputNumber, 'LunaticInputNumber'),
	{
		inputId: 'lunatic-input-number',
	}
);

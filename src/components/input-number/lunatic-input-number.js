import React from 'react';
import InputNumber from './input-number';
import {
	createCustomizableLunaticField,
	createLunaticComponent,
	Errors,
} from '../commons';

const LunaticInputNumber = ({ errors, ...props }) => (
	<>
		<InputNumber {...props} />
		<Errors errors={errors} />
	</>
);

export default createLunaticComponent(
	createCustomizableLunaticField(LunaticInputNumber),
	{
		inputId: 'lunatic-input-number',
	}
);

import React from 'react';
import InputNumber from './input-number';
import { createLunaticComponent, Errors } from '../commons';

const LunaticInputNumber = ({ errors, ...props }) => (
	<>
		<InputNumber {...props} />
		<Errors errors={errors} />
	</>
);

export default createLunaticComponent(LunaticInputNumber, {
	inputId: 'lunatic-input-number',
});

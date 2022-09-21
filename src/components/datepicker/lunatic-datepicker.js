import React from 'react';
import Datepicker from './datepicker';
import {
	createCustomizableLunaticField,
	createLunaticComponent,
	Errors,
} from '../commons';
import './datepicker.scss';

const LunaticDatepicker = ({ errors, ...props }) => (
	<>
		<Datepicker {...props} />
		<Errors errors={errors} />
	</>
);

export default createLunaticComponent(
	createCustomizableLunaticField(LunaticDatepicker),
	{
		inputId: 'lunatic-datepicker',
	}
);

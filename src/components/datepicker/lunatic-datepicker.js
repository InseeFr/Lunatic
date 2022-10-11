import React from 'react';
import Datepicker from './datepicker';
import {
	createCustomizableLunaticField,
	createLunaticComponent,
	Errors,
} from '../commons';
import './datepicker.scss';

const LunaticDatepicker = ({ errors, ...props }) => {
	const { id } = props;
	return (
		<>
			<Datepicker {...props} />
			<Errors errors={errors} activeId={id} />
		</>
	);
};

export default createLunaticComponent(
	createCustomizableLunaticField(LunaticDatepicker, 'LunaticDatepicker'),
	{
		inputId: 'lunatic-datepicker',
	}
);

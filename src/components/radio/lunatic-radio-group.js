import React from 'react';
import RadioGroup from './radio-group';
import { createLunaticComponent, Errors } from '../commons';
import './radio.scss';

function LunaticRadioGroup(props) {
	const { id, options, value, onChange, checkboxStyle, custom, errors } = props;
	return (
		<>
			<RadioGroup
				id={id}
				options={options}
				value={value}
				onClick={onChange}
				checkboxStyle={checkboxStyle}
				custom={custom}
			/>
			<Errors errors={errors} />
		</>
	);
}

export default createLunaticComponent(LunaticRadioGroup, {
	fieldset: true,
	inputId: 'lunatic-radio-group',
});

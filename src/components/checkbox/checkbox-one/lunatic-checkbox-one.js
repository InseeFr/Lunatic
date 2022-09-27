import React from 'react';
import LunaticRadioGroup from '../../radio';
import { createCustomizableLunaticField, Errors } from '../../commons';

function LunaticCheckboxOne({ errors, ...props }) {
	const { id } = props;
	return (
		<>
			<LunaticRadioGroup {...props} checkboxStyle={true} />
			<Errors errors={errors} activeId={id} />
		</>
	);
}
export default createCustomizableLunaticField(LunaticCheckboxOne);

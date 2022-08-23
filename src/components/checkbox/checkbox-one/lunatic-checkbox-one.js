import React from 'react';
import LunaticRadioGroup from '../../radio';
import { Errors } from '../../commons';

function LunaticCheckboxOne({ errors, ...props }) {
	return (
		<>
			<LunaticRadioGroup {...props} checkboxStyle={true} />
			<Errors errors={errors} />
		</>
	);
}
export default LunaticCheckboxOne;

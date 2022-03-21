import React from 'react';
import Radio from './radio-group';
import { FieldContainer, Fieldset, useOnHandleChange } from '../commons';
import {
	DeclarationsBeforeText,
	DeclarationsAfterText,
	DeclarationsDetachable,
} from '../declarations';
import './radio.scss';

function LunaticRadioGroup(props) {
	const {
		label,
		id,
		options,
		value,
		handleChange,
		response,
		declarations,
		checkboxStyle,
		custom,
	} = props;

	const onClick = useOnHandleChange({ handleChange, response, value });

	return (
		<>
			<DeclarationsBeforeText declarations={declarations} custom={custom} />
			<FieldContainer id={id} value={value} custom={custom}>
				<Fieldset legend={label} custom={custom}>
					<DeclarationsAfterText declarations={declarations} custom={custom} />
					<Radio
						id={id}
						options={options}
						value={value}
						onClick={onClick}
						checkboxStyle={checkboxStyle}
						custom={custom}
					/>
				</Fieldset>
			</FieldContainer>
			<DeclarationsDetachable declarations={declarations} custom={custom} />
		</>
	);
}

export default React.memo(LunaticRadioGroup);

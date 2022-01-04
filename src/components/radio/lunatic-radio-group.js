import React, { useCallback } from 'react';
import RadioGroup from './radio-group';
import { FieldContainer, Fieldset } from '../commons';
import {
	DeclarationsBeforeText,
	DeclarationsAfterText,
	DeclarationsDetachable,
} from '../declarations';
import './radio.scss';

function useOnHandleChange({ handleChange, response, value }) {
	const onClick = useCallback(
		function (valueOption) {
			if (value !== valueOption) {
				handleChange(response, valueOption);
			}
		},
		[handleChange, response, value]
	);

	return onClick;
}

function LunaticRadioGroup(props) {
	const { label, id, options, value, handleChange, response, declarations } =
		props;

	const onClick = useOnHandleChange({ handleChange, response, value });

	return (
		<>
			<DeclarationsBeforeText declarations={declarations} />
			<FieldContainer id={id} value={value}>
				<Fieldset legend={label}>
					<DeclarationsAfterText declarations={declarations} />
					<RadioGroup
						id={id}
						options={options}
						value={value}
						onClick={onClick}
					/>
				</Fieldset>
			</FieldContainer>
			<DeclarationsDetachable declarations={declarations} />
		</>
	);
}

export default React.memo(LunaticRadioGroup);

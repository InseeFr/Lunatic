import React, { useCallback } from 'react';
import RadioGroup from './radio-group';
import Fieldset from './fieldset';
import { FieldContainer } from '../commons';
import {
	DeclarationsBeforeText,
	DeclarationsAfterText,
	DeclarationsDetachable,
} from '../declarations';
import './radio.scss';

function Radio(props) {
	const {
		label,
		id,
		options,
		value,
		handleChange,
		response,
		declarations,
		executeExpression,
		bindingDependencies,
		iteration,
	} = props;

	const vtl = { executeExpression, iteration, bindingDependencies };
	const onClick = useCallback(
		function (valueOption) {
			if (value !== valueOption) {
				handleChange(response, valueOption);
			}
		},
		[handleChange, response, value]
	);

	return (
		<>
			<DeclarationsBeforeText declarations={declarations} {...vtl} />
			<FieldContainer id={id} value={value}>
				<Fieldset legend={label} {...vtl}>
					<DeclarationsAfterText declarations={declarations} {...vtl} />
					<RadioGroup
						id={id}
						options={options}
						value={value}
						onClick={onClick}
						{...vtl}
					/>
				</Fieldset>
			</FieldContainer>
			<DeclarationsDetachable declarations={declarations} {...vtl} />
		</>
	);
}

export default React.memo(Radio);

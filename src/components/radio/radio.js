import React, { useCallback } from 'react';
import RadioGroup from './radio-group';
import Fieldset from './fieldset';
import { FieldContainer } from '../commons';
import Declarations from '../declarations';
import './radio.scss';

// import componentWrapper from '../component-wrapper';
// import { ListDeclarationsWrapper } from '../declarations/wrappers';
// import { areEqual } from '../../utils/lib';
// const Radio = (props) => <ListDeclarationsWrapper type="radio" {...props} />;
// export default componentWrapper(React.memo(Radio, areEqual));

function Radio(props) {
	const { label, id, options, value, handleChange, response } = props;

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
			<Declarations />
			<FieldContainer id={id} value={value}>
				<Fieldset legend={label}>
					<Declarations />
					<RadioGroup
						id={id}
						options={options}
						value={value}
						onClick={onClick}
					/>
				</Fieldset>
			</FieldContainer>
			<Declarations />
		</>
	);
}

export default React.memo(Radio);

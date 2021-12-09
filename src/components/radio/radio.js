import React, { useCallback } from 'react';
import RadioGroup from './radio-group';
import FieldContainer from './field-container';
import Legend from './legend';
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
		<FieldContainer>
			<Legend>{label}</Legend>
			<RadioGroup id={id} options={options} value={value} onClick={onClick} />
		</FieldContainer>
	);
}

export default React.memo(Radio);

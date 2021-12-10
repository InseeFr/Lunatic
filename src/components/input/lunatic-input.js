import React, { useCallback } from 'react';
import { FieldContainer, Label } from '../commons';
import Input from './input';
import Declarations from '../declarations';
import './input.scss';

// import { InputDeclarationsWrapper } from '../declarations/wrappers';
// import { areEqual } from '../../utils/lib';
// import componentWrapper from '../component-wrapper';

// const Input = (props) => (
// 	<InputDeclarationsWrapper type="text" roleType="input" {...props} />
// );

// export default componentWrapper(React.memo(Input, areEqual));

function LunaticInput(props) {
	const { label, id, value, handleChange, response, disabled } = props;

	const onChange = useCallback(
		function (inputValue) {
			if (value !== inputValue) {
				handleChange(response, inputValue);
			}
		},
		[handleChange, response, value]
	);

	const inputId = `lunatic-input-${id}`;
	const labelId = `lunatic-input-label-${id}`;

	return (
		<>
			<Declarations />
			<Label id={labelId} htmlFor={inputId} className={'todo'}>
				{label}
			</Label>
			<Declarations />
			<FieldContainer value={value} id={id}>
				<Input
					id={inputId}
					labelledBy={labelId}
					value={value}
					onChange={onChange}
					disabled={disabled}
				/>
			</FieldContainer>
			<Declarations />
		</>
	);
}

export default React.memo(LunaticInput);

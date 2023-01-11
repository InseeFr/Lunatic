import React from 'react';
import Input from './input';
import LunaticComponent from '../commons/components/lunatic-component-without-label';
import useOnHandleChange from '../commons/use-on-handle-change';
import './input.scss';

function LunaticInput(props) {
	const {
		id,
		value,
		handleChange,
		response,
		errors,
		custom,
		declarations,
		preferences,
		label,
		disabled,
		missing,
		missingResponse,
		management,
		...rest
	} = props;

	const onChange = useOnHandleChange({ handleChange, response, value });

	return (
		<LunaticComponent
			id={id}
			custom={custom}
			preferences={preferences}
			declarations={declarations}
			value={value}
			missing={missing}
			missingResponse={missingResponse}
			management={management}
		>
			<Input
				id={id}
				value={value}
				onChange={onChange}
				custom={custom}
				label={label}
				disabled={disabled}
				errors={errors}
				{...rest}
			/>
		</LunaticComponent>
	);
}

LunaticInput.defaultProps = {
	className: 'todo',
};

export default LunaticInput;

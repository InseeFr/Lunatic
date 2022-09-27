import React from 'react';
import Input from './input';
import { createLunaticComponent, Errors } from '../commons';
import './input.scss';

const LunaticInput = ({ errors, ...props }) => {
	const { id } = props;
	return (
		<>
			<Input {...props} />
			<Errors errors={errors} activeId={id} />
		</>
	);
};

LunaticInput.defaultProps = {
	className: 'todo',
};

export default createLunaticComponent(LunaticInput, {
	inputId: 'lunatic-input',
});

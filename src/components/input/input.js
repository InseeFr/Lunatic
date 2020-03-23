import React from 'react';
import { InputDeclarationsWrapper } from '../declarations/wrappers';
import './input.scss';

const Input = props => (
	<InputDeclarationsWrapper type="text" roleType="input" {...props} />
);

export default Input;

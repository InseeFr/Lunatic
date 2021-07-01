import React from 'react';
import { InputDeclarationsWrapper } from '../declarations/wrappers';
import { areEqual } from '../../utils/lib';
import missingWrapper from '../missing-wrapper';
import './input.scss';

const Input = (props) => (
	<InputDeclarationsWrapper type="text" roleType="input" {...props} />
);

export default React.memo(missingWrapper(Input), areEqual);

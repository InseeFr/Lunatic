import React from 'react';
import { InputDeclarationsWrapper } from '../declarations/wrappers';
import { areEqual } from '../../utils/lib';
import componentWrapper from '../component-wrapper';
import './input.scss';

const Input = (props) => (
	<InputDeclarationsWrapper type="text" roleType="input" {...props} />
);

export default componentWrapper(React.memo(Input, areEqual));

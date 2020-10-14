import React from 'react';
import { InputDeclarationsWrapper } from '../declarations/wrappers';
import { areEqual } from '../../utils/lib';
import './textarea.scss';

const Textarea = (props) => (
	<InputDeclarationsWrapper type={null} roleType="textarea" {...props} />
);

export default React.memo(Textarea, areEqual);

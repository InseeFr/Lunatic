import React from 'react';
import { InputDeclarationsWrapper } from '../declarations/wrappers';
import './textarea.scss';

const Textarea = props => (
	<InputDeclarationsWrapper type={null} roleType="textarea" {...props} />
);

export default Textarea;

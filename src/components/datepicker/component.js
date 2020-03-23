import React from 'react';
import { InputDeclarationsWrapper } from '../declarations/wrappers';
import './datepicker.scss';

const Datepicker = props => (
	<InputDeclarationsWrapper type="date" roleType="datepicker" {...props} />
);

export default Datepicker;

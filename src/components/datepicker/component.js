import React from 'react';
import missingWrapper from '../missing-wrapper';
import { InputDeclarationsWrapper } from '../declarations/wrappers';
import { areEqual } from '../../utils/lib';
import './datepicker.scss';

const Datepicker = (props) => (
	<InputDeclarationsWrapper type="date" roleType="datepicker" {...props} />
);

export default missingWrapper(React.memo(Datepicker, areEqual));

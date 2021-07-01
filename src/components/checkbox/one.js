import React from 'react';
import missingWrapper from '../missing-wrapper';
import { ListDeclarationsWrapper } from '../declarations/wrappers';
import { areEqual } from '../../utils/lib';
import './checkbox.scss';

const CheckboxOne = (props) => (
	<ListDeclarationsWrapper type="checkbox" {...props} hasSpecificHandler />
);

export default React.memo(missingWrapper(CheckboxOne), areEqual);

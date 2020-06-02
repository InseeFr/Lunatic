import React from 'react';
import { ListDeclarationsWrapper } from '../declarations/wrappers';
import { areEqual } from '../../utils/lib';
import './checkbox.scss';

const CheckboxOne = (props) => (
	<ListDeclarationsWrapper type="checkbox" {...props} />
);

export default React.memo(CheckboxOne, areEqual);
